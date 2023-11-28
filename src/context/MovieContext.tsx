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
  IList,
  IMovieDetails,
  IMovieResults,
  ITvDetails,
  IUserList,
  TListType,
  TMediaType,
} from "../abstract/interfaces";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AxiosError } from "axios";
import {
  COLLECTION_LIST,
  COLLECTION_TRACKER,
  ERROR_F_AD_MV_LS,
  ERROR_F_AD_TV_LS,
  ERROR_UM_AP,
  MEDIA_TV,
} from "../abstract/constants";
import { useAuth } from "./AuthContext";

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
  getUserMovieList: (
    content: IGetUserMovieList
  ) => Promise<{ movieList: DocumentData[]; tvList: DocumentData[] }>;
  handleSaveListType: (
    listType: TListType,
    movie: IMovieDetails | ITvDetails | null,
    mediaType: TMediaType
  ) => DocumentData | null;
  createNewList: (payload: IList) => void;
  getUserLists: (payload: IUserList) => Promise<DocumentData[]>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export function MovieProvider({ children }: MovieProviderProps) {
  const { user } = useAuth();

  const [page, setPage] = useState<number>(1);
  const [params, _] = useSearchParams();
  const [adult, setAdult] = useState(false);
  const [mode, setMode] = useState("popular");
  const [term, setTerm] = useState("lost");
  const [lang, setLang] = useState("pt-BR");
  const [isSearching, setIsSearching] = useState(false);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

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
  const handleSaveListType = async (
    listType: TListType,
    data: IMovieDetails | ITvDetails | null,
    mediaType: TMediaType
  ) => {
    if (user) {
      if (data) {
        if ("title" in data) {
          const content: IAddMovieToList = {
            mediaType: "movie",
            listType: listType,
            movieId: data.id,
            userId: user.uid,
            poster: data.poster_path,
            title: data.title,
          };
          await addMovieToList(content);
          const response = await getMovieList(data, mediaType);
          return response;
        } else if ("name" in data) {
          const content: IAddMovieToList = {
            mediaType: "tv",
            listType: listType,
            movieId: data.id,
            userId: user.uid,
            poster: data.poster_path,
            title: data.name,
          };
          await addMovieToList(content);
          const response = await getMovieList(data, mediaType);
          return response;
        }
      } else {
        alert("movie required");
      }
    } else {
      alert("login required");
    }
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const getMovieList = async (
    movie: IMovieDetails | ITvDetails | null,
    mediaType: TMediaType
  ) => {
    if (user) {
      if (movie) {
        const response = await getUserMovieList({
          userId: user.uid,
          movieId: movie.id,
          fullList: false,
          mediaType: mediaType,
        });

        return response;
      } else {
        alert("movie required get movie list");
      }
    } else {
      alert("user required get movie list");
    }
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const addTvToList = async (content: IAddTvToList) => {
    let exists_ = false;
    let docId_ = null;
    const q = query(
      collection(db, COLLECTION_TRACKER),
      where("userId", "==", content.userId),
      where("movieId", "==", content.movieId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      exists_ = doc.exists();
      docId_ = doc.id;
    });

    if (!exists_) {
      const docRef = await addDoc(collection(db, COLLECTION_TRACKER), content);
      // update list
    } else if (exists_ && docId_) {
      // update list
      const docRef = doc(db, COLLECTION_TRACKER, docId_);
      await updateDoc(docRef, {
        seasons: content.seasons,
      });
    } else {
      alert(ERROR_F_AD_TV_LS);
    }
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const addMovieToList = async (content: IAddMovieToList) => {
    let exists_ = false;
    let docId_ = null;
    const q = query(
      collection(db, COLLECTION_TRACKER),
      where("userId", "==", content.userId),
      where("movieId", "==", content.movieId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      exists_ = doc.exists();
      docId_ = doc.id;
    });

    if (!exists_) {
      const docRef = await addDoc(collection(db, COLLECTION_TRACKER), content);
      // update list
    } else if (exists_ && docId_) {
      // update list
      const docRef = doc(db, COLLECTION_TRACKER, docId_);
      await updateDoc(docRef, {
        listType: content.listType,
      });
    } else {
      alert(ERROR_F_AD_MV_LS);
    }
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const getUserMovieList = async (
    content: IGetUserMovieList
  ): Promise<{ movieList: DocumentData[]; tvList: DocumentData[] }> => {
    let _query;
    if (content.fullList) {
      _query = query(
        collection(db, COLLECTION_TRACKER),
        where("userId", "==", content.userId)
      );
    } else {
      // get only one document
      _query = query(
        collection(db, COLLECTION_TRACKER),
        where("userId", "==", content.userId),
        where("movieId", "==", content.movieId)
        // movieId for movies and tvs
      );
    }

    const querySnapshot = await getDocs(_query);
    const movieList: DocumentData[] = [];
    const tvList: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      const _mediaType = doc.data().mediaType;
      if (_mediaType === MEDIA_TV) {
        tvList.push({ id: doc.id, ...doc.data() });
      } else {
        movieList.push({ id: doc.id, ...doc.data() });
      }
    });

    return { movieList, tvList };
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const createNewList = async (payload: IList) => {
    let exists_ = false;
    let docId_ = null;
    const q = query(
      collection(db, COLLECTION_LIST),
      where("userId", "==", payload.userId),
      where("name", "==", payload.name)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      exists_ = doc.exists();
      docId_ = doc.id;
    });

    if (!exists_) {
      // add new list
      const docRef = await addDoc(collection(db, COLLECTION_LIST), payload);
    } else if (exists_ && docId_) {
      // update list
      const docRef = doc(db, COLLECTION_LIST, docId_);
      await updateDoc(docRef, {
        list: [{ movieId: 347181, poster: "5UaMtHDN4OnALvm19KCO0kPMYwm.jpg" }],
      });
    } else {
      alert("ERROR_F_AD_MV_LS");
    }
  };
  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  const getUserLists = async (payload: IUserList): Promise<DocumentData[]> => {
    let _query;
    if (payload.fullList) {
      _query = query(
        collection(db, COLLECTION_LIST),
        where("userId", "==", payload.userId)
      );
    } else {
      // get only one document
      // TODO: fix not working
      _query = query(
        collection(db, COLLECTION_LIST),
        where("id", "==", payload.id),
        where("userId", "==", payload.userId)
        // movieId for movies and tvs
      );
    }
    const querySnapshot = await getDocs(_query);
    const userList: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() });
    });
    return userList;
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
        handleSaveListType,
        createNewList,
        getUserLists,
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
