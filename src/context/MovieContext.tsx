import { DocumentData } from "firebase/firestore";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { IMovieResults, TMediaType } from "../abstract/interfaces";
import useFetch from "../hooks/useFetch";
import { AxiosError } from "axios";
import { ERROR_UM_AP } from "../abstract/constants";
import { useAuth } from "./AuthContext";

import { useData } from "./DataContext";
import { TListFilter } from "../abstract/interfaces2";

interface MovieContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  //
  mediaType: TMediaType;
  setMediaType: React.Dispatch<React.SetStateAction<TMediaType>>;
  //
  list: TListFilter;
  setList: React.Dispatch<React.SetStateAction<TListFilter>>;
  //
  data: IMovieResults | null;
  loading: boolean;
  error: AxiosError | null;
  //
  userTrackerList: DocumentData[];
  setUserTrackerList: React.Dispatch<React.SetStateAction<DocumentData[]>>;

  userTrackerTv: DocumentData[];
  userTrackerMovie: DocumentData[];
  //
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  //
  handleGetUserTrackers: () => void;
}

type TMovieProviderProps = {
  children: ReactNode;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer  ${apiToken}`,
  },
};

export function MovieProvider({ children }: TMovieProviderProps) {
  const { user } = useAuth();
  const { getUserTrackers } = useData();

  const [page, setPage] = useState<number>(1);

  const [list, setList] = useState<TListFilter>("now");

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
  const [userTrackerTv, setUserTrackerTv] = useState<DocumentData[]>([]);
  const [userTrackerMovie, setUserTrackerMovie] = useState<DocumentData[]>([]);

  const searchUrl = `${tmdbBaseUrl}/search/${mediaType}?language=${lang}&query=${term}&include_adult=${adult}&page=${page}`;

  const trendingUrl = `${tmdbBaseUrl}/trending/${mediaType}/day?language=${lang}&include_adult=${adult}&page=${page}`;

  const nowUrl = `${tmdbBaseUrl}/${mediaType}/${
    mediaType === "movie" ? "now_playing" : "on_the_air"
  }?language=${lang}&include_adult=${adult}&page=${page}`;

  const popularUrl = `${tmdbBaseUrl}/${mediaType}/popular?language=${lang}&include_adult=${adult}&page=${page}`;

  const [url, setUrl] = useState<string | null>(null);
  const [urlPop, setUrlPop] = useState<string | null>(null);
  // pop
  // fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  // now
  // fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  //
  // pop
  // fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
  // on the air
  // fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
  //
  // trending
  // movie
  // fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  // fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
  // all
  // fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)

  /**
   * if movie and now
   * primeiro fetch
   * else if movie and popular
   * segundo fetch
   *
   * else if tv and pop
   * terceiro fetch
   * else if tv and now
   * quarto fetch
   *
   * else
   * default
   */

  const _url = url ? url : popularUrl;

  const { data, loading, error } = useFetch<IMovieResults | null>(
    _url,
    options
  );

  const handleGetUserTrackers = useCallback(async () => {
    const response = await getUserTrackers();
    if (response) {
      setUserTrackerTv(response.tvList);
      setUserTrackerMovie(response.movieList);
    }
  }, [getUserTrackers]);

  useEffect(() => {
    if (isSearching) setUrl(searchUrl);
    else {
      if (list === "now") {
        setUrl(nowUrl);
      } else if (list === "popular") {
        setUrl(popularUrl);
      } else if (list === "trending") {
        setUrl(trendingUrl);
      }
    }
    return () => {};
  }, [searchUrl, isSearching, term, list, nowUrl, popularUrl, trendingUrl]);

  useEffect(() => {
    if (user) handleGetUserTrackers();
  }, [mediaType, user, handleGetUserTrackers]);

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

        list,
        setList,

        userTrackerList,
        setUserTrackerList,

        handleGetUserTrackers,

        userTrackerTv,
        userTrackerMovie,
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
