import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { db } from "../config/firebase";
import { IListType } from "../abstract/interfaces";

export interface AddMovieToList {
  type: "movie" | "tv";
  list: "see" | "saw" | "block";
  movieId: string;
  userId: string;
  poster: string;
  title: string;
}

interface MovieContextType {
  movieList: DocumentData[];
  addMovieToList: (content: AddMovieToList) => void;
  getMovieList: (userId: string, listType?: IListType) => void;
  deleteMovie: (movieId: string, userId: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export function MovieProvider({ children }: MovieProviderProps) {
  const [movieList, setMovieList] = useState<DocumentData[]>([]);

  const addMovieToList = async (content: AddMovieToList) => {
    const docRef = await addDoc(collection(db, "tracker"), content);
    console.log(docRef);
  };

  const getMovieList = async (
    userId: string,
    listType: IListType = { type: "see" }
  ) => {
    const q = query(
      collection(db, "tracker"),
      where("userId", "==", userId),
      where("list", "==", listType.type)
    );

    const querySnapshot = await getDocs(q);
    const list: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      list.push({ id: doc.id, ...doc.data() });
    });
    setMovieList(list);
    console.log(list);
  };

  const deleteMovie = async (movieId: string, userId: string) => {
    await deleteDoc(doc(db, "tracker", movieId));
    getMovieList(userId, { type: "see" });
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <MovieContext.Provider
      value={{
        addMovieToList,
        getMovieList,
        deleteMovie,
        movieList,
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
