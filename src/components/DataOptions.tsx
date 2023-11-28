import { Button, Dropdown, Icon, Segment } from "semantic-ui-react";
import {
  IMovieDetails,
  ITvDetails,
  IUserList,
  TListItemData,
  TListType,
} from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import { useEffect, useState } from "react";
import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { COLLECTION_LIST } from "../abstract/constants";
import { containsItemWithId } from "../helper";

const DataOptions = ({
  data,
  listType,
  handleClick,
}: {
  data: IMovieDetails | ITvDetails;
  listType: TListType;
  handleClick: (listType: TListType) => void;
}) => {
  type TOptions = {
    key: string;
    icon: string;
    text: string;
    value: string;
    onClick: () => void;
  };

  const { user } = useAuth();
  const { getUserLists } = useMovie();
  const [options, setOptions] = useState<DocumentData[]>([]);

  const addToList = async (item: DocumentData) => {
    // get user list
    const docRef = doc(db, COLLECTION_LIST, item.id);
    const docSnap = await getDoc(docRef);

    let _doc: DocumentData | null = null;
    if (docSnap.exists()) {
      _doc = { id: docSnap.id, ...docSnap.data() };
    } else {
      // docSnap.data() will be undefined in this case
      alert("No such document!");
    }

    if (_doc) {
      // check if the list contains the movie

      const _existsInList = containsItemWithId(_doc.list, data.id);
      if (_existsInList) {
        // remove item from list
        const _newList = _doc.list.filter(
          (x: TListItemData) => x.id !== data.id
        );

        const docRef = doc(db, COLLECTION_LIST, _doc.id);
        await updateDoc(docRef, {
          list: _newList,
        });
      } else {
        // add item to list

        const _data: TListItemData = {
          id: data.id,
          name: "title" in data ? data.title : data.name,
          poster_path: data.poster_path,
          mediaType: "title" in data ? "movie" : "tv",
        };
        // if has title is movie, else tv
        const _newList = _doc.list;
        _newList.push(_data);

        const docRef = doc(db, COLLECTION_LIST, _doc.id);
        await updateDoc(docRef, {
          list: _newList,
        });
      }
    } else {
      alert("doc not founded");
    }
  };

  useEffect(() => {
    if (user) {
      const payload: IUserList = {
        userId: user.uid,
        fullList: true,
      };

      (async () => {
        const response = await getUserLists(payload);
        if (response) {
          const _options: TOptions[] = [];
          response.forEach((item, index) => {
            const _option = {
              key: "list " + index,
              icon: "list",
              text: item.name,
              value: item.name,
              onClick: () => addToList(item),
            };
            _options.push(_option);
          });
          setOptions(_options);
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex flex-center gap-sm ">
      <button
        className={`${
          listType === "see" ? "app-button__primary" : ""
        } app-button`}
        onClick={() => handleClick("see")}
      >
        <Icon name="add" /> Vou Ver
      </button>
      <button
        className={`${
          listType === "saw" ? "app-button__primary" : ""
        } app-button`}
        onClick={() => handleClick("saw")}
      >
        <Icon name="check" /> Já Vi
      </button>
      <button
        className={`${
          listType === "block" ? "app-button__primary" : ""
        } app-button`}
        onClick={() => handleClick("block")}
      >
        <Icon name="delete" /> Bloquear
      </button>
      <button
        className={`${
          listType === "block" ? "app-button__primary" : ""
        } app-button`}
      >
        <Icon name="list" /> Lista
      </button>

      <Button.Group color="green">
        <Button>Salvar</Button>
        <Dropdown
          className="button icon"
          floating
          options={options}
          trigger={<></>}
        />
      </Button.Group>
    </div>
  );
};

export default DataOptions;
