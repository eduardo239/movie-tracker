import { createContext, useContext, ReactNode } from "react";

import { ERROR_UM_AP } from "../abstract/constants";
import { useAuth } from "./AuthContext";
import { DocumentData } from "firebase/firestore";
import {
  delUserTrackerFB,
  getUserTrackerFB,
  getUserTrackersFB,
  setUserListFB,
  setUserTrackerFB,
  setUserTrackerSeasonFB,
} from "../fetch/firebase2";
import {
  IGetUserTracker,
  ISetUserList,
  ISetUserTracker,
} from "../abstract/interfaces2";

interface DataContextType {
  // lists
  setUserList: (payload: ISetUserList) => Promise<void>;

  // trackers
  getUserTracker: (
    payload: IGetUserTracker
  ) => Promise<DocumentData | undefined>;
  getUserTrackers: (
    payload: IGetUserTracker
  ) => Promise<
    { movieList: DocumentData[]; tvList: DocumentData[] } | undefined
  >;
  setUserTracker: (payload: ISetUserTracker) => Promise<void>;
  setUserTrackerSeason: (payload: ISetUserTracker) => Promise<void>;
  delUserTracker: (id: string) => Promise<void>;
  // delUserTrackers: (list: DocumentData[]) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

type TDataProviderProps = {
  children: ReactNode;
};

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export function DataProvider({ children }: TDataProviderProps) {
  const { user } = useAuth();

  // busca o tracker
  const getUserTracker = async (payload: IGetUserTracker) => {
    if (user) {
      const _payload = { ...payload, user };
      const response = await getUserTrackerFB(_payload);
      return response;
    }
  };
  // busca a lista de trackers tv e filmes
  const getUserTrackers = async (payload: IGetUserTracker) => {
    if (user) {
      const _payload = { ...payload, user };
      const response = await getUserTrackersFB(_payload);
      return response;
    }
  };
  // salva o tracker do usuário
  const setUserTracker = async (payload: ISetUserTracker) => {
    if (user) {
      const _payload = { ...payload, user };
      await setUserTrackerFB(_payload);
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
  // NEXT:
  const setUserList = async (payload: ISetUserList) => {
    if (user) {
      const _payload = { ...payload, user };
      await setUserListFB(_payload);
    }
  };
  //
  return (
    <DataContext.Provider
      value={{
        getUserTracker,
        getUserTrackers,
        setUserTracker,
        setUserTrackerSeason,
        delUserTracker,
        setUserList,
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
