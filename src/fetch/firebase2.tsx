import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
  MEDIA_TV,
  SUC_CREATED_LIST,
} from "../abstract/constants";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";

import {
  IGetUserTracker,
  ISetUserList,
  ISetUserTracker,
} from "../abstract/interfaces2";

// single item movie/tv
export const getDataItemFB = async () => {
  console.log("get data item");
};
// list items movie/tv
export const getDataItemsFB = async () => {
  console.log("get data items");
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// set single list
export const setUserListFB = async (payload: ISetUserList) => {
  let exists = false;
  let id = null;
  const q = query(
    collection(db, COLLECTION_LIST),
    where("user", "==", payload.userId),
    where("name", "==", payload.name)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    exists = doc.exists();
    id = doc.id;
  });

  if (!exists) {
    // add new list
    try {
      await addDoc(collection(db, COLLECTION_LIST), payload);
      toast.success(SUC_CREATED_LIST);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return error.message;
      }
    }
  } else if (exists && id) {
    toast.error(ERR_EXISTS_CREATED_LIST);
  } else {
    toast.error(ERR_CREATED_LIST);
  }
};
// get single list
export const getUserListFB = async (listId: string) => {
  const docRef = doc(db, COLLECTION_LIST, listId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    toast.error("Lista não encontrada.");
  }
};

// get user lists
export const getUserListsFB = async (userId: string) => {
  const _query = query(
    collection(db, COLLECTION_LIST),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(_query);
  const list: DocumentData[] = [];

  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });

  return list;
};
// del user list
export const delUserListFB = async () => {
  console.log("del users list ----------------------------");
};
// del user lists
export const delUserListsFB = async () => {
  console.log("del users lists ----------------------------");
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// set user tracker
export const setUserTrackerFB = async (payload: ISetUserTracker) => {
  const _item = {
    mediaType: payload.mediaType,
    listType: payload.listType,
    dataId: payload.data.id,
    userId: payload.user.uid,
    poster: payload.data.poster_path,
    title: "title" in payload.data ? payload.data.title : payload.data.name,
  };

  // check if is movie or tv
  let exists = false;
  let id = null;

  const q = query(
    collection(db, COLLECTION_TRACKER),
    where("userId", "==", payload.user.uid),
    where("dataId", "==", payload.data.id)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    exists = doc.exists();
    id = doc.id;
  });

  if (!exists) {
    await addDoc(collection(db, COLLECTION_TRACKER), _item);
  } else if (exists && id) {
    const docRef = doc(db, COLLECTION_TRACKER, id);
    await updateDoc(docRef, {
      listType: payload.listType,
    });
  }
};
// set user tracker tv season
export const setUserTrackerSeasonFB = async (payload: ISetUserTracker) => {
  let exists = false;
  let id = null;

  const q = query(
    collection(db, COLLECTION_TRACKER),
    where("userId", "==", payload.user.uid),
    where("dataId", "==", payload.data.id)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    exists = doc.exists();
    id = doc.id;
  });

  if (!exists) {
    toast.info("Item não encontrado.");
  } else if (exists && id) {
    const docRef = doc(db, COLLECTION_TRACKER, id);
    await updateDoc(docRef, {
      seasons: payload.seasons,
    });
  } else {
    toast.info(ERROR_F_AD_TV_LS);
  }
};
// get user single tracker
export const getUserTrackerFB = async (payload: IGetUserTracker) => {
  const _query = query(
    collection(db, COLLECTION_TRACKER),
    where("userId", "==", payload.user.uid),
    where("dataId", "==", payload.data.id)
  );

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

  if (movieList.length > 0) return movieList[0];
  if (tvList.length > 0) return tvList[0];
};
// get user trackers
export const getUserTrackersFB = async (payload: IGetUserTracker) => {
  const _query = query(
    collection(db, COLLECTION_TRACKER),
    where("userId", "==", payload.user.uid)
  );

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
// del user tracker
export const delUserTrackerFB = async (userId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_TRACKER, userId));
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.message);
    }
  }
};
// del user trackers
export const delUserTrackersFB = async (list: DocumentData[]) => {
  console.log("del users trackers");
  for (let i = 0; i < list.length; i++) {
    try {
      await deleteDoc(doc(db, COLLECTION_TRACKER, list[i].id));
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  }
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
