import { DocumentData } from "firebase/firestore";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  IAddMovieToList,
  IAddTvToList,
  IList,
  IMovieDetails,
  IMovieResults,
  ISaveItemToWatchList,
  ISaveListType,
  ITvDetails,
  IUserList,
  TListType,
  TMediaType,
} from "../abstract/interfaces";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AxiosError } from "axios";
import { ERROR_UM_AP } from "../abstract/constants";
import { useAuth } from "./AuthContext";
import {
  getUserListsFB,
  saveItemToWatchList,
  saveNewListFB,
  saveTvSeasonFB,
} from "../fetch/firebase";

interface MovieContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  //
  mediaType: TMediaType;
  setMediaType: React.Dispatch<React.SetStateAction<TMediaType>>;
  //
  data: IMovieResults | null;
  loading: boolean;
  error: AxiosError | null;
  //
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  //
  handleAddSeasonToTvList: (payload: IAddTvToList) => void;
  handleSaveToWatchList: (payload: ISaveItemToWatchList) => DocumentData | null;
  handleCreateNewList: (payload: IList) => void;
  handleGetUserLists: (
    payload: IUserList
  ) => Promise<{ userLists: DocumentData[] }>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

type TMovieProviderProps = {
  children: ReactNode;
};

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export function MovieProvider({ children }: TMovieProviderProps) {
  const { user } = useAuth();

  const [page, setPage] = useState<number>(1);
  const [params, _] = useSearchParams();
  const [adult, setAdult] = useState(false);
  const [mode, setMode] = useState("popular");
  const [term, setTerm] = useState("lost");
  const [lang, setLang] = useState("pt-BR");
  const [isSearching, setIsSearching] = useState(false);
  const [mediaType, setMediaType] = useState<TMediaType>("movie");

  const searchUrl = `${tmdbBaseUrl}/search/${mediaType}?api_key=${apiKey}&language=${lang}&query=${term}&include_adult=${adult}&page=${page}`;
  const baseUrl = `${tmdbBaseUrl}/trending/${mediaType}/day?api_key=${apiKey}&language=${lang}&include_adult=${adult}&page=${page}`;
  const popularUrl = `https://api.themoviedb.org/3/${mediaType}/latest?api_key=${apiKey}&language=${lang}&include_adult=${adult}&page=${page}`;

  const [url, setUrl] = useState<string | null>(null);
  const { data, loading, error } = useFetch<IMovieResults | null>(
    url ? url : baseUrl
  );

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  useEffect(() => {
    if (isSearching) setUrl(searchUrl);
    else setUrl(baseUrl);
    return () => {};
  }, [baseUrl, searchUrl, isSearching, term]);

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  useEffect(() => {
    const _page = params.get("page");
    if (_page) setPage(+_page);
    return () => {};
  }, [params, setPage]);

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  // search url
  // base url

  // base url properties : adult, mode, lang, mediaType, page
  // search url properties : term, isSearching, lang, mediaType, page

  // save data to tracker list
  // remove data from tracker list
  // update data from tracker list
  // get data tracker list

  // save new list
  // update list
  // remove list
  // get user list by user id

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const handleSaveToWatchList = async (payload: ISaveItemToWatchList) => {
    const response = await saveItemToWatchList(payload);
    return response;
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const handleAddSeasonToTvList = async (payload: IAddTvToList) => {
    const response = await saveTvSeasonFB(payload);
    return response;
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const handleCreateNewList = async (payload: IList) => {
    await saveNewListFB(payload);
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const handleGetUserLists = async (payload: IUserList) => {
    const response = await getUserListsFB(payload);
    return response;
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  return (
    <MovieContext.Provider
      value={{
        data,
        loading,
        error,
        page,
        setPage,
        term,
        setTerm,
        setIsSearching,
        mediaType,
        setMediaType,
        handleAddSeasonToTvList,
        handleSaveToWatchList,
        handleCreateNewList,
        handleGetUserLists,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovie() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error(ERROR_UM_AP);
  }

  return context;
}
