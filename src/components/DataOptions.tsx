import { Dropdown, Icon } from "semantic-ui-react";
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

type TDataOptions = {
  data: IMovieDetails | ITvDetails;
  listType: TListType;
  handleClick: (listType: TListType) => void;
};

type TOptions = {
  key: string;
  icon: string;
  text: string;
  value: string;
  onClick: () => void;
};

const DataOptions = ({ data, listType, handleClick }: TDataOptions) => {
  const { user } = useAuth();
  const { handleGetUserLists } = useMovie();

  const [options, setOptions] = useState<DocumentData[]>([]);

  /**
   * Ao clicar na temporada, alterna entre assistido e não assistido
   * @param item documentData
   */
  const toggleItemFromList = async (item: DocumentData) => {
    // get user list
    const docRef = doc(db, COLLECTION_LIST, item.id);
    const docSnap = await getDoc(docRef);

    let _doc: DocumentData | null = null;
    if (docSnap.exists()) {
      _doc = { id: docSnap.id, ...docSnap.data() };
    } else {
      // docSnap.data() will be undefined in this case
      alert("[addOrRemoveFromList] - No such document!");
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
          media_type: "title" in data ? "movie" : "tv",
        };
        // if has title is movie, else tv
        const _newList = _doc.list;
        _newList.push(_data);

        const docRef = doc(db, COLLECTION_LIST, _doc.id);
        await updateDoc(docRef, {
          list: _newList,
        });
      }
      fetchUserList();
    } else {
      alert("[addOrRemoveFromList] - DOC not found");
    }
  };

  const fetchUserList = async () => {
    if (user) {
      const _data: IUserList = {
        userId: user.uid,
      };
      const response = await handleGetUserLists(_data);

      if (!response) {
        alert("[fetchUserList] - response not found.");
      }

      const _array = checkUserList(response.userLists);
      setOptions(_array);
    } else {
      alert("[fetchUserList] - User not found");
    }
  };

  const checkUserList = (array: DocumentData[]) => {
    const _options: TOptions[] = [];

    array.forEach((item, index) => {
      if (item.list) {
        const isItOnTheList = containsItemWithId(item.list, data.id);
        const _option = {
          key: "list " + index,
          icon: isItOnTheList ? "check" : "list",
          text: item.name,
          value: item.name,
          onClick: () => toggleItemFromList(item),
        };
        _options.push(_option);
      }
    });
    return _options;
  };

  useEffect(() => {
    fetchUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data]);

  const handleButton = (listTypeLabel: TListType, label: string) => {
    return (
      <button
        className={`${
          listType === listTypeLabel ? "app-button__primary" : ""
        } app-button`}
        onClick={() => handleClick(listTypeLabel)}
      >
        <Icon name="add" /> {label}
      </button>
    );
  };

  return (
    <div className="flex flex-center gap-sm ">
      {handleButton("saw", "Já Vi")}
      {handleButton("see", "Vou Ver")}
      {handleButton("block", "Bloquear")}

      <Dropdown
        className="app-button app-dropdown z-100"
        floating
        options={options}
        trigger={<>Adicionar</>}
      />
    </div>
  );
};

export default DataOptions;
