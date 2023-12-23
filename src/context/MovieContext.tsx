import { DocumentData } from "firebase/firestore";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  IGetUserMovieList,
  IMovieResults,
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
import { getUserWatchListFB } from "../fetch/firebase";
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
  handleGetUserTrackerList: () => void;
}

type TMovieProviderProps = {
  children: ReactNode;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

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
  //
  const [isSearching, setIsSearching] = useState(false);
  const [mediaType, setMediaType] = useState<TMediaType>("movie");
  //
  const [userTrackerList, setUserTrackerList] = useState<DocumentData[]>([]);
  //
  const searchUrl = `${tmdbBaseUrl}/search/${mediaType}?api_key=${apiKey}&language=${lang}&query=${term}&include_adult=${adult}&page=${page}`;

  const baseUrl = `${tmdbBaseUrl}/trending/${mediaType}/day?api_key=${apiKey}&language=${lang}&include_adult=${adult}&page=${page}`;

  const popularUrl = `https://api.themoviedb.org/3/${mediaType}/latest?api_key=${apiKey}&language=${lang}&include_adult=${adult}&page=${page}`;

  const [url, setUrl] = useState<string | null>(null);

  const _url = url ? url : baseUrl;
  const { data, loading, error } = useFetch<IMovieResults | null>(_url);

  const handleGetUserTrackerList = useCallback(async () => {
    if (user && mediaType) {
      const payload: IGetUserMovieList = {
        fullList: true,
        userId: user.uid,
        mediaType: mediaType,
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
  }, [mediaType, user]);

  //
  useEffect(() => {
    if (isSearching) setUrl(searchUrl);
    else setUrl(baseUrl);
    return () => {};
  }, [baseUrl, searchUrl, isSearching, term]);

  useEffect(() => {
    if (user) handleGetUserTrackerList();
  }, [mediaType, user, handleGetUserTrackerList]);
  //

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

        userTrackerList,
        setUserTrackerList,

        handleGetUserTrackerList,
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
