import { Dropdown, Icon } from "semantic-ui-react";
import { IMovieDetails, ITvDetails, TListType } from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import {
  ERR_DOCUMENT_NOT_FOUND,
  ERR_USER_NOT_FOUND,
} from "../abstract/constants";
import { containsItemWithId } from "../helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { IUpdUserList } from "../abstract/interfaces2";

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
  const { getUserLists, getUserList, updUserList } = useData();
  const navigate = useNavigate();
  const [options, setOptions] = useState<DocumentData[]>([]);

  const toggleItemFromList = async (item: DocumentData) => {
    const response = await getUserList(item.id);

    if (response) {
      const isItOnTheList = containsItemWithId(response.list, data.id);
      if (isItOnTheList) {
        // remover o item da lista
        const _list1 = response.list.filter(
          (x: IUpdUserList) => x.id !== data.id
        );
        await updUserList(_list1, item.id);
      } else {
        // se contém title é filme, senão tv
        const _data: IUpdUserList = {
          id: data.id,
          name: "title" in data ? data.title : data.name,
          poster_path: data.poster_path,
          media_type: "title" in data ? "movie" : "tv",
        };

        const _list2 = item.list;
        _list2.push(_data);

        await updUserList(_list2, item.id);
      }
    } else {
      toast.error(ERR_DOCUMENT_NOT_FOUND);
    }
    fetchUserList();
  };

  const fetchUserList = async () => {
    if (user) {
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
