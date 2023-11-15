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

interface MovieContextType {
  page: string | null;
  setPage: React.Dispatch<React.SetStateAction<string | null>>;
  mediaType: "movie" | "tv" | null;
  setMediaType: React.Dispatch<React.SetStateAction<"movie" | "tv" | null>>;
  movieList: DocumentData[];
  movieData: IMovieResults | [];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setMovieData: React.Dispatch<React.SetStateAction<IMovieResults | []>>;
  searchResults: DocumentData[];
  setSearchResults: React.Dispatch<React.SetStateAction<DocumentData[]>>;
  trackerList: DocumentData | null;
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

export function MovieProvider({ children }: MovieProviderProps) {
  const [page, setPage] = useState<string | null>(null);
  const [movieList, setMovieList] = useState<DocumentData[]>([]);
  const [searchResults, setSearchResults] = useState<DocumentData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [movieData, setMovieData] = useState<IMovieResults | []>([]);
  const [trackerList, setTrackerList] = useState<DocumentData | null>(null);
  const [mediaType, setMediaType] = useState<"movie" | "tv" | null>("movie");

  const [params, _] = useSearchParams();

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  useEffect(() => {
    const _page = params.get("page");
    if (_page) setPage(_page);
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
    setMovieList(list);
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

    setTrackerList(doc_);
  };

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  useEffect(() => {
    return () => {};
  }, []);

  // - - - - - - - - - - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -
  return (
    <MovieContext.Provider
      value={{
        search,
        setSearch,
        movieData,
        setMovieData,
        page,
        setPage,
        mediaType,
        setMediaType,
        addMovieToList,
        addTvToList,
        getUserMovieList,
        getUserMovieTracker,
        deleteMovie,
        movieList,
        trackerList,
        searchResults,
        setSearchResults,
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
