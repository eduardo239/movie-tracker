import { Dropdown, Icon } from "semantic-ui-react";
import {
  IMovieDetails,
  ITvDetails,
  TListItemData,
  TListType,
} from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import { useEffect, useState } from "react";
import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import {
  COLLECTION_LIST,
  ERR_DOCUMENT_NOT_FOUND,
  ERR_USER_NOT_FOUND,
  SUC_TRACKER_ADD,
  SUC_TRACKER_REMOVED,
} from "../abstract/constants";
import { containsItemWithId } from "../helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

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
  // const { handleGetList } = useMovie();
  const { getUserLists, getUserList } = useData();
  const navigate = useNavigate();
  const [options, setOptions] = useState<DocumentData[]>([]);

  const toggleItemFromList = async (item: DocumentData) => {
    const response = await getUserList(item.id);
    console.log(response);

    if (response) {
      const isItOnTheList = containsItemWithId(response.list, data.id);
      if (isItOnTheList) {
        console.log(1);
        // remove item from list
        const _newList = response.list.filter(
          (x: TListItemData) => x.id !== data.id
        );
        // atualiza

        const docRef = doc(db, COLLECTION_LIST, item.id);
        await updateDoc(docRef, {
          list: _newList,
        });
        toast.info(SUC_TRACKER_REMOVED);
      } else {
        console.log(2);
        const _data: TListItemData = {
          id: data.id,
          name: "title" in data ? data.title : data.name,
          poster_path: data.poster_path,
          media_type: "title" in data ? "movie" : "tv",
        };
        // if has title is movie, else tv
        const _newList = item.list;
        _newList.push(_data);

        const docRef = doc(db, COLLECTION_LIST, item.id);
        await updateDoc(docRef, {
          list: _newList,
        });
        toast.success(SUC_TRACKER_ADD);
      }
    } else {
      toast.error(ERR_DOCUMENT_NOT_FOUND);
    }
    fetchUserList();
    /////
    // get user list
    // const docRef = doc(db, COLLECTION_LIST, item.id);
    // const docSnap = await getDoc(docRef);

    // let _doc: DocumentData | null = null;

    // if (docSnap.exists()) {
    //   _doc = { id: docSnap.id, ...docSnap.data() };
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   toast.error(ERR_DOCUMENT_NOT_FOUND);
    // }

    // if (_doc) {
    //   // check if the list contains the movie

    //   const _existsInList = containsItemWithId(_doc.list, data.id);
    //   if (_existsInList) {
    //     // remove item from list
    //     const _newList = _doc.list.filter(
    //       (x: TListItemData) => x.id !== data.id
    //     );

    //     const docRef = doc(db, COLLECTION_LIST, _doc.id);
    //     await updateDoc(docRef, {
    //       list: _newList,
    //     });
    //     toast.info(SUC_TRACKER_REMOVED);
    //   } else {
    //     // add item to list
    //     const _data: TListItemData = {
    //       id: data.id,
    //       name: "title" in data ? data.title : data.name,
    //       poster_path: data.poster_path,
    //       media_type: "title" in data ? "movie" : "tv",
    //     };
    //     // if has title is movie, else tv
    //     const _newList = _doc.list;
    //     _newList.push(_data);

    //     const docRef = doc(db, COLLECTION_LIST, _doc.id);
    //     await updateDoc(docRef, {
    //       list: _newList,
    //     });
    //     toast.success(SUC_TRACKER_ADD);
    //   }
    //   fetchUserList();
    // } else {
    //   toast.error(ERR_DOCUMENT_NOT_FOUND);
    // }
  };

  const fetchUserList = async () => {
    if (user) {
      // const response = await handleGetList();
      const response = await getUserLists();
      if (!response) {
        toast.error(ERR_DOCUMENT_NOT_FOUND);
      }
      if (response) {
        const _array = checkUserList(response);
        setOptions(_array);
      }
    } else {
      toast.error(ERR_USER_NOT_FOUND);
    }
  };

  const checkUserList = (array: DocumentData[]) => {
    const _optionsList: TOptions[] = [];

    if (array.length > 0) {
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

          _optionsList.push(_option);
        }
      });
      const _default = {
        key: "add_new_list ",
        icon: "plus",
        text: "Criar uma Lista",
        value: "create",
        onClick: () => navigate("/lists"),
      };
      _optionsList.push(_default);
      return _optionsList;
    } else {
      const _default = {
        key: "add_new_list ",
        icon: "plus",
        text: "Criar uma Lista",
        value: "create",
        onClick: () => navigate("/lists"),
      };
      _optionsList.push(_default);
      return _optionsList;
    }
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
      {handleButton("see", "Vou Ver")}
      {handleButton("saw", "Já Vi")}
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
