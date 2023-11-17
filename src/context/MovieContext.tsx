import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
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
  IMovieResults,
  TListType,
} from "../abstract/interfaces";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AxiosError } from "axios";

interface MovieContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;

  mediaType: "movie" | "tv" | null;
  setMediaType: React.Dispatch<React.SetStateAction<"movie" | "tv" | null>>;

  movieList: DocumentData[];
  setMovieList: React.Dispatch<React.SetStateAction<DocumentData[]>>;

  data: IMovieResults | null;
  loading: boolean;
  error: AxiosError | null;

  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;

  addMovieToList: (content: IAddMovieToList) => void;
  addTvToList: (content: IAddTvToList) => void;
  getUserMovieList: (
    userId: string,
    listType: TListType,
    fullList: boolean
  ) => void;
  getUserMovieTracker: (movieId: string, userId: string) => void;
  deleteMovie: (movieId: string, userId: string, actualList: TListType) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export function MovieProvider({ children }: MovieProviderProps) {
  const [page, setPage] = useState<number>(1);
  const [movieList, setMovieList] = useState<DocumentData[]>([]);
  const [mediaType, setMediaType] = useState<"movie" | "tv" | null>("movie");

  const [params, _] = useSearchParams();
  const [adult, setAdult] = useState(false);
  const [term, setTerm] = useState("lost");
  const [lang, setLang] = useState("pt-BR");
  const [isSearching, setIsSearching] = useState(false);

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
    // check if exists
    let alreadyExists = false;
    let docId = null;

    const q = query(
      collection(db, "tracker"),
      where("userId", "==", content.userId),
      where("movieId", "==", content.movieId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      alreadyExists = doc.exists();
      docId = doc.id;
    });

    if (!alreadyExists) {
      // save if not exists

      const docRef = await addDoc(collection(db, "tracker"), content);
      getUserMovieTracker(content.movieId, content.userId);
    } else {
      if (docId) {
        const docRef = doc(db, "tracker", docId);
        // se estiver true, e clicar no mesmo, mudar para falso
        // se estiver true, e clicar em outro, manter o true
        // se estiver em false, clicar nele, mudar para true

        await updateDoc(docRef, {
          listType: content.listType,
        });

        getUserMovieTracker(content.movieId, content.userId);
      }
    }
  };

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const getUserMovieList = async (
    userId: string,
    listType: TListType,
    fullList: boolean = false
  ) => {
    let q;
    if (fullList) {
      q = query(collection(db, "tracker"), where("userId", "==", userId));
    } else {
      q = query(
        collection(db, "tracker"),
        where("userId", "==", userId),
        where(`listType.${listType}`, "==", true)
      );
    }

    const querySnapshot = await getDocs(q);
    const list: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    // setMovieList(list);
  };

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const deleteMovie = async (
    movieId: string,
    userId: string,
    actualList: TListType
  ) => {
    await deleteDoc(doc(db, "tracker", movieId));

    if (actualList === "all") {
      getUserMovieList(userId, actualList, true);
    } else {
      getUserMovieList(userId, actualList, false);
    }
  };

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const getUserMovieTracker = async (movieId: string, userId: string) => {
    const q = query(
      collection(db, "tracker"),
      where("userId", "==", userId),
      where("movieId", "==", movieId)
    );
    let doc_: DocumentData = {};
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      doc_ = { id: doc.id, ...doc.data() };
    });

    // setTrackerList(doc_);
  };

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  useEffect(() => {
    return () => {};
  }, []);

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
        getUserMovieTracker,
        deleteMovie,
        movieList,
        setMovieList,
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
