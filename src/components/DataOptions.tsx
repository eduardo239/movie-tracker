import { Button, Dropdown, Icon, Segment } from "semantic-ui-react";
import {
  IMovieDetails,
  ITvDetails,
  IUserList,
  IGetUserWatchList,
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
import { useNavigate } from "react-router-dom";
import { getUserWatchList } from "../fetch/firebase";

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mediaType } = useMovie();
  const [options, setOptions] = useState<DocumentData[]>([]);

  const addOrRemoveFromList = async (item: DocumentData) => {
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
      fetchUserList();
    } else {
      alert("doc not founded");
    }
  };

  const fetchUserList = async () => {
    if (user) {
      (async () => {
        // Antes::
        // const payload: IUserList = {
        //   userId: user.uid,
        //   fullList: true,
        // };
        // const payload: IGetUserWatchList = {
        //   data: null,
        //   mediaType: mediaType,
        //   user: user,
        // };
        // const response = await getUserWatchList(payload);
        // if (response) {
        //   console.log(response);
        //   const _options: TOptions[] = [];
        //   response.forEach((item, index) => {
        //     const isItOnTheList = containsItemWithId(item.list, data.id);
        //     const _option = {
        //       key: "list " + index,
        //       icon: isItOnTheList ? "check" : "list",
        //       text: item.name,
        //       value: item.name,
        //       onClick: () => addOrRemoveFromList(item),
        //     };
        //     _options.push(_option);
        //   });
        //   setOptions(_options);
        // }
      })();
    }
  };

  useEffect(() => {
    fetchUserList();
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

      <>
        <button className="app-button" onClick={() => navigate("/lists")}>
          <Icon name="list" /> Listas
        </button>
        <Dropdown
          className="app-button app-dropdown"
          floating
          options={options}
          trigger={<>Adicionar</>}
        />
      </>
    </div>
  );
};

export default DataOptions;
