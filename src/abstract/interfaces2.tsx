import { User } from "firebase/auth";
import { IMovieDetails, ITvDetails, TListType, TMediaType } from "./interfaces";
import { DocumentData } from "firebase/firestore";

//
// trackers
//
export interface IGetUserTracker {
  data: IMovieDetails | ITvDetails;
  mediaType: TMediaType;
  user: User;
}
export interface IGetUserTrackers {
  mediaType?: TMediaType;
  user: User;
}
export interface ISetUserTracker {
  listType: TListType;
  data: IMovieDetails | ITvDetails;
  mediaType: TMediaType;
  user: User;
  seasons?: number[];
}
//
// lists
//
export interface ISetUserListItem {
  id: number;
  name: string;
  poster_path: string;
  media_type: TMediaType;
}
export interface ISetUserList {
  name: string;
  description: string;
  isPublic: boolean;
  list?: ISetUserListItem[];
  userId: string;
}
export interface IUpdUserList {
  id: number;
  name: string;
  poster_path: string;
  media_type: "movie" | "tv";
}
//
// delete items
//
export interface IDelMultipleItems {
  list: DocumentData[];
  collection: "list" | "tracker";
}
export interface IDelItemById {
  id: string;
  collection: "list" | "tracker";
}

// movie list data type
export type TListFilter = "popular" | "trending" | "now";
