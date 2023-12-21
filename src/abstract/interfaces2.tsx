import { User } from "firebase/auth";
import { IMovieDetails, ITvDetails, TListType, TMediaType } from "./interfaces";

export interface IGetUserTracker {
  data: IMovieDetails | ITvDetails;
  mediaType: TMediaType;
  user: User;
}

export interface ISetUserTracker {
  listType: TListType;
  data: IMovieDetails | ITvDetails;
  mediaType: TMediaType;
  user: User;
  seasons?: number[];
}

// export interface IDelUserTracker {
//   id: string;
// }

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
