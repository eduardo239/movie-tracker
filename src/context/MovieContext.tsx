import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
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

export interface AddMovieToList {
  type: "movie" | "tv";
  list: {
    see?: boolean;
    saw?: boolean;
    block?: boolean;
  };
  movieId: string;
  userId: string;
  poster: string;
  title: string;
}

interface MovieContextType {
  movieList: DocumentData[];
  movieTracker: DocumentData | null;
  addMovieToList: (content: AddMovieToList) => void;
  getMovieList: (userId: string, listType: "see" | "saw" | "block") => void;
  getTracker: (movieId: string, userId: string) => void;
  deleteMovie: (
    movieId: string,
    userId: string,
    actualList: "see" | "saw" | "block"
  ) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export function MovieProvider({ children }: MovieProviderProps) {
  const [movieList, setMovieList] = useState<DocumentData[]>([]);
  const [movieTracker, setMovieTracker] = useState<DocumentData | null>(null);

  const addMovieToList = async (content: AddMovieToList) => {
    // check if exists

    // save if not exists
    const docRef = await addDoc(collection(db, "tracker"), content);

    // update if exists
  };

  const getMovieList = async (
    userId: string,
    listType: "see" | "saw" | "block"
  ) => {
    const q = query(
      collection(db, "tracker"),
      where("userId", "==", userId),
      where(`list.${listType}`, "==", true)
    );

    const querySnapshot = await getDocs(q);
    const list: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setMovieList(list);
  };

  const deleteMovie = async (
    movieId: string,
    userId: string,
    actualList: "see" | "saw" | "block"
  ) => {
    await deleteDoc(doc(db, "tracker", movieId));
    getMovieList(userId, actualList);
  };

  const getTracker = async (movieId: string, userId: string) => {
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
    setMovieTracker(doc_);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <MovieContext.Provider
      value={{
        addMovieToList,
        getMovieList,
        getTracker,
        deleteMovie,
        movieList,
        movieTracker,
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
