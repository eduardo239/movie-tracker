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
  IGetUserMovieList,
  IGetUserWatchList,
  IList,
  IListFB,
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
  deleteItemByIdFB,
  deleteMultipleItemsByIdFB,
  getListFB,
  getTrackerFB,
  getUserListsFB,
  getUserWatchListFB,
  saveItemToWatchList,
  saveItemToWatchListFB,
  saveItemToWatchListFB2,
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
  // handleGetUserWatchList: (payload: IGetUserWatchList) => DocumentData | null;

  handleCreateNewList: (payload: IList) => void;

  handleGetUserWatchListAndReturn: () => void;
  ///////
  handleDeleteMultiplyItemsById: (
    list: DocumentData[],
    collection: "list" | "tracker"
  ) => Promise<void>;
  handleDeleteItemById: (
    id: string,
    collection: "list" | "tracker"
  ) => Promise<void>;
  handleGetList: () => Promise<{ list: DocumentData[] }>;
  handleGetTracker: (payload: IGetUserWatchList) => Promise<DocumentData>;
  handleSetTracker: (payload: ISaveItemToWatchList) => Promise<void>;
  getTracker: (payload: IGetUserWatchList) => Promise<DocumentData | null>;
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
  // --------------------------------------------------------------------------------- //
  // --------------------------------------------------------------------------------- //
  useEffect(() => {
    if (isSearching) setUrl(searchUrl);
    else setUrl(baseUrl);
    return () => {};
  }, [baseUrl, searchUrl, isSearching, term]);
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const handleAddSeasonToTvList = async (payload: IAddTvToList) => {
    const response = await saveTvSeasonFB(payload);
    return response;
  };
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
  const handleCreateNewList = async (payload: IList) => {
    await saveNewListFB(payload);
  };
  // --------------------------------------------------------------------------------- //
  // --------------------------------------------------------------------------------- //
  const handleGetTracker = async (payload: IGetUserWatchList) => {
    if (user) {
      const response = await getTrackerFB({ ...payload, userId: user.uid });

      if (!response) {
        toast.error(ERR_RESPONSE_NOT_FOUND);
        return { list: [] };
      }

      return response;
    } else {
      toast.error(ERR_USER_NOT_FOUND);
      return { list: [] };
    }
  };
  const handleGetList = async () => {
    if (user) {
      const response = await getListFB({ userId: user.uid });
      if (!response) {
        toast.error(ERR_RESPONSE_NOT_FOUND);
        return { list: [] };
      }
      return response;
    } else {
      toast.error(ERR_USER_NOT_FOUND);
      return { list: [] };
    }
  };
  const handleDeleteItemById = async (
    id: string,
    collection: "list" | "tracker"
  ) => {
    await deleteItemByIdFB(id, collection);
  };
  const handleDeleteMultiplyItemsById = async (
    list: DocumentData[],
    collection: "list" | "tracker"
  ) => {
    await deleteMultipleItemsByIdFB(list, collection);
  };
  // --------------------------------------------------------------------------------- //
  // --------------------------------------------------------------------------------- //
  // --------------------------------------------------------------------------------- //

  const getTracker = async (
    payload: IGetUserWatchList
  ): Promise<DocumentData | null> => {
    if (user) {
      const response = await getTrackerFB({ ...payload, userId: user.uid });
      if (!response) {
        return response;
      }

      return response;
    } else {
      toast.error(ERR_USER_NOT_FOUND);
      return null;
    }
  };
  const handleSetTracker = async (payload: ISaveItemToWatchList) => {
    // ---------- | ---------- //

    if (payload.data && user) {
      const content: IAddMovieToList = {
        mediaType: payload.mediaType,
        listType: payload.listType,
        movieId: payload.data.id,
        userId: user.uid,
        poster: payload.data.poster_path,
      };
      if ("title" in payload.data) {
        await saveItemToWatchListFB2({
          ...content,
          title: payload.data.title,
        });
      } else if ("name" in payload.data) {
        await saveItemToWatchListFB2({
          ...content,
          title: payload.data.name,
        });
      }
    } else {
      toast.error(ERR_USER_NOT_FOUND);
    }
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
        handleSetTracker,
        handleCreateNewList,

        handleGetTracker,
        userTrackerList,
        setUserTrackerList,
        handleGetUserWatchListAndReturn,
        handleDeleteMultiplyItemsById,
        handleDeleteItemById,
        handleGetList,

        getTracker,
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
