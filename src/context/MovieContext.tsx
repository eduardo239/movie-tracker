import { DocumentData } from "firebase/firestore";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  IAddTvToList,
  IGetUserMovieList,
  IGetUserWatchList,
  IList,
  IMovieResults,
  ISaveItemToWatchList,
  IUserList,
  TMediaType,
} from "../abstract/interfaces";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AxiosError } from "axios";
import {
  ERROR_UM_AP,
  ERR_RESPONSE_NOT_FOUND,
  ERR_USER_NOT_FOUND,
} from "../abstract/constants";
import { useAuth } from "./AuthContext";
import {
  deleteListByIdFB,
  deleteTrackerByIdFB,
  deleteTrackersByIdFB,
  getUserListsFB,
  getUserWatchListFB,
  getUserWatchListsFB,
  saveItemToWatchList,
  saveNewListFB,
  saveTvSeasonFB,
} from "../fetch/firebase";
import { toast } from "react-toastify";

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
  userTrackerList: DocumentData[];
  setUserTrackerList: React.Dispatch<React.SetStateAction<DocumentData[]>>;
  //
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  //
  handleAddSeasonToTvList: (payload: IAddTvToList) => void;
  handleSaveToWatchList: (payload: ISaveItemToWatchList) => DocumentData | null;
  handleGetUserWatchList: (payload: IGetUserWatchList) => DocumentData | null;

  handleCreateNewList: (payload: IList) => void;
  handleGetUserLists: (
    payload: IUserList
  ) => Promise<{ userLists: DocumentData[] }>;

  handleDeleteList: (id: string) => void;
  handleDeleteTrackerList: (trackerList: DocumentData[]) => Promise<void>;
  handleDeleteTracker: (id: string) => Promise<void>;

  handleGetUserWatchListAndReturn: () => void;
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

  const [userTrackerList, setUserTrackerList] = useState<DocumentData[]>([]);

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

  // FIXME: bug ao mudar de pagina
  // useEffect(() => {
  //   const _page = params.get("page");
  //   if (_page) setPage(+_page);
  //   return () => {};
  // }, [params]);

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  // search url
  // base url

  // base url properties : adult, mode, lang, mediaType, page
  // search url properties : term, isSearching, lang, mediaType, page

  // watch-list
  // handleSaveToWatchList save item to watch list
  // handleAddSeasonToTvList add season to watch list
  // handleGetUserWatchList get user watch list, return single item
  // handleGetUserWatchListAndReturn get user watch list and update setUserTrackerList
  // handleDeleteTrackerList delete many watch list items by id
  // handleDeleteTracker delete watch list item by id

  // list
  // handleCreateNewList create a new list
  // handleGetUserLists get user lists
  // handleDeleteList delete user list by id
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
  const handleGetUserWatchList = async (payload: IGetUserWatchList) => {
    const response = await getUserWatchListsFB(payload);
    return response;
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const handleGetUserWatchListAndReturn = async () => {
    if (user) {
      const payload: IGetUserMovieList = {
        fullList: true,
        userId: user.uid,
        mediaType: mediaType ? mediaType : "movie",
      };
      const response = await getUserWatchListFB(payload);
      if (!response) {
        toast.error(ERR_RESPONSE_NOT_FOUND);
        return;
      }

      if (mediaType == "tv") {
        setUserTrackerList(response.tvList);
      } else {
        setUserTrackerList(response.movieList);
      }

      return response;
    } else {
      toast.error(ERR_USER_NOT_FOUND);
    }
  };
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
  const handleDeleteList = async (id: string) => {
    await deleteListByIdFB(id);
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const handleDeleteTrackerList = async (trackerList: DocumentData[]) => {
    await deleteTrackersByIdFB(trackerList);
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -

  const handleDeleteTracker = async (id: string) => {
    await deleteTrackerByIdFB(id);
  };

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
        handleGetUserWatchList,
        handleDeleteList,
        handleDeleteTrackerList,
        handleDeleteTracker,
        userTrackerList,
        setUserTrackerList,
        handleGetUserWatchListAndReturn,
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
