import { createContext, useContext, ReactNode, useState } from "react";

import { ERROR_UM_AP, ERR_USER_NOT_FOUND } from "../abstract/constants";
import { useAuth } from "./AuthContext";
import { DocumentData } from "firebase/firestore";
import {
  delItemByIdFB,
  delMultipleItemsFB,
  delUserTrackerFB,
  getUserListFB,
  getUserListsFB,
  getUserTrackerFB,
  getUserTrackersFB,
  setUserListFB,
  setUserTrackerFB,
  setUserTrackerSeasonFB,
  updUserListFB,
} from "../fetch/firebase2";
import {
  IDelItemById,
  IDelMultipleItems,
  IGetUserTracker,
  IGetUserTrackers,
  ISetUserList,
  ISetUserTracker,
  IUpdUserList,
} from "../abstract/interfaces2";
import { toast } from "react-toastify";
import { useMovie } from "./MovieContext";

type TMTList = { movieList: DocumentData[]; tvList: DocumentData[] };

interface DataContextType {
  //
  // lists
  //
  setUserList: (payload: ISetUserList) => Promise<void>;
  getUserLists: () => Promise<DocumentData[] | undefined>;
  getUserList: (listId: string) => Promise<DocumentData | null>;
  updUserList: (list: IUpdUserList[], listId: string) => Promise<void>;
  //
  // trackers
  //
  getUserTracker: (payload: IGetUserTracker) => Promise<DocumentData | null>;
  getUserTrackers: (payload?: IGetUserTrackers) => Promise<TMTList | null>;
  setUserTracker: (payload: ISetUserTracker) => Promise<void>;
  setUserTrackerSeason: (payload: ISetUserTracker) => Promise<void>;
  delUserTracker: (id: string) => Promise<void>;
  //
  // multiple
  //
  delMultipleItems: (payload: IDelMultipleItems) => Promise<void>;
  delItemById: (payload: IDelItemById) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

type TDataProviderProps = {
  children: ReactNode;
};

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export function DataProvider({ children }: TDataProviderProps) {
  const { user } = useAuth();

  const [userTrackerList, setUserTrackerList] = useState<TMTList | null>(null);

  // busca o tracker
  const getUserTracker = async (payload: IGetUserTracker) => {
    const response = await getUserTrackerFB(payload);
    if (response) return response;
    return null;
  };
  // busca os trackers tv e filmes
  const getUserTrackers = async (payload?: IGetUserTrackers) => {
    if (user && payload) {
      const response = await getUserTrackersFB(payload);
      return response;
    }
    return null;
  };
  // salva o tracker do usuário
  const setUserTracker = async (payload: ISetUserTracker) => {
    if (user) {
      await setUserTrackerFB(payload);
    } else {
      toast.info(ERR_USER_NOT_FOUND);
    }
  };
  // salvar a temporada da série
  const setUserTrackerSeason = async (payload: ISetUserTracker) => {
    if (user) {
      const _payload = { ...payload, user };
      await setUserTrackerSeasonFB(_payload);
    }
  };
  // remover o tracker
  const delUserTracker = async (payload: string) => {
    if (user) {
      await delUserTrackerFB(payload);
    }
  };

  //
  //
  //
  //

  // cria uma nova lista
  const setUserList = async (payload: ISetUserList) => {
    if (user) {
      await setUserListFB(payload);
    }
  };
  // busca as listas do usuário
  const getUserLists = async () => {
    if (user) {
      const response = await getUserListsFB(user.uid);
      return response;
    }
  };
  // busca uma única lista
  const getUserList = async (listId: string) => {
    if (user) {
      const response = await getUserListFB(listId);
      if (response) return response;
    }
    return null;
  };
  // atualiza a lista do usuário
  const updUserList = async (list: IUpdUserList[], listId: string) => {
    if (user) {
      await updUserListFB(list, listId);
    }
  };

  //
  //
  //

  // remover item pelo id
  const delItemById = async (payload: IDelItemById) => {
    await delItemByIdFB(payload);
  };
  // remover vários itens pelo id
  const delMultipleItems = async (payload: IDelMultipleItems) => {
    await delMultipleItemsFB(payload);
  };

  return (
    <DataContext.Provider
      value={{
        getUserTracker,
        getUserTrackers,
        setUserTracker,
        setUserTrackerSeason,
        delUserTracker,
        setUserList,
        getUserLists,
        getUserList,
        updUserList,
        delMultipleItems,
        delItemById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(ERROR_UM_AP);
  }

  return context;
}
