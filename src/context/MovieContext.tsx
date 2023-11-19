import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { db } from "../config/firebase";
import {
  IAddMovieToList,
  IAddTvToList,
  IGetUserMovieList,
  IMovieResults,
} from "../abstract/interfaces";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AxiosError } from "axios";

interface MovieContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  //
  mediaType: "movie" | "tv";
  setMediaType: React.Dispatch<React.SetStateAction<"movie" | "tv">>;
  //
  data: IMovieResults | null;
  loading: boolean;
  error: AxiosError | null;
  //
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  //
  addTvToList: (content: IAddTvToList) => void;
  addMovieToList: (content: IAddMovieToList) => void;
  getUserMovieList: (content: IGetUserMovieList) => Promise<DocumentData[]>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export function MovieProvider({ children }: MovieProviderProps) {
  const [page, setPage] = useState<number>(1);
  const [params, _] = useSearchParams();
  const [adult, setAdult] = useState(false);
  const [term, setTerm] = useState("lost");
  const [lang, setLang] = useState("pt-BR");
  const [isSearching, setIsSearching] = useState(false);

  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

  const [url, setUrl] = useState<string | null>(null);

  const searchUrl = `${tmdbBaseUrl}/search/${mediaType}?api_key=${apiKey}&language=${lang}&query=${term}&include_adult=${adult}&page=${page}`;
  const baseUrl = `${tmdbBaseUrl}/trending/${mediaType}/day?api_key=${apiKey}&language=${lang}&include_adult=${adult}&page=${page}`;

  const { data, loading, error } = useFetch<IMovieResults | null>(
    url ? url : baseUrl
  );

  useEffect(() => {
    if (isSearching) setUrl(searchUrl);
    else setUrl(baseUrl);

    return () => {};
  }, [baseUrl, searchUrl, isSearching, term]);

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  useEffect(() => {
    const _p = params.get("page");
    if (_p) setPage(+_p);

    return () => {};
  }, [params, setPage]);

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const addTvToList = async (content: IAddTvToList) => {
    // check if already exists
    // save if not exists
    // update if exists
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const addMovieToList = async (content: IAddMovieToList) => {
    let exists_ = false;
    let docId_ = null;
    const q = query(
      collection(db, "tracker"),
      where("userId", "==", content.userId),
      where("movieId", "==", content.movieId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      exists_ = doc.exists();
      docId_ = doc.id;
    });

    if (!exists_) {
      const docRef = await addDoc(collection(db, "tracker"), content);
      // update list
    } else if (exists_ && docId_) {
      // update list
      const docRef = doc(db, "tracker", docId_);
      await updateDoc(docRef, {
        listType: content.listType,
      });
    } else {
      alert("error - addMovieToList");
    }
  };

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const getUserMovieList = async (
    content: IGetUserMovieList
  ): Promise<DocumentData[]> => {
    let q;
    if (content.fullList) {
      q = query(
        collection(db, "tracker"),
        where("userId", "==", content.userId)
      );
    } else {
      q = query(
        collection(db, "tracker"),
        where("userId", "==", content.userId),
        where("movieId", "==", content.movieId)
      );
    }

    const querySnapshot = await getDocs(q);
    const list: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    return list;
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
        addMovieToList,
        addTvToList,
        getUserMovieList,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovie() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
