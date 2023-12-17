import {
  IAddMovieToList,
  IAddTvToList,
  IGetUserMovieList,
  IList,
  IUserList,
  IGetUserWatchList,
  ISaveItemToWatchList,
  IListFB,
} from "../abstract/interfaces";
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
import { db } from "../config/firebase";
import {
  COLLECTION_LIST,
  COLLECTION_TRACKER,
  ERROR_F_AD_TV_LS,
  ERR_CREATED_LIST,
  ERR_EXISTS_CREATED_LIST,
  ERR_MOVIE_OR_TV_NOT_FOUND,
  ERR_RESPONSE_NOT_FOUND,
  ERR_USER_NOT_FOUND,
  MEDIA_TV,
  SUC_CREATED_LIST,
  SUC_LIST_REMOVED,
  SUC_TRACKER_REMOVED,
} from "../abstract/constants";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
