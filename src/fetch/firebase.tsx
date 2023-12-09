import {
  IAddMovieToList,
  IAddTvToList,
  IGetUserMovieList,
  IList,
  IUserList,
  IGetUserWatchList,
  ISaveItemToWatchList,
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
  MEDIA_TV,
} from "../abstract/constants";

// - - - - - - - - - - - SET WATCH LIST - - - - - - - - - - - - - - - - - - //
/**
 *
 * @param payload listType, data, mediaType, user
 * @returns objeto, com movieWatchList e tvWatchList
 */
export const saveItemToWatchList = async (payload: ISaveItemToWatchList) => {
  if (payload.user) {
    //
    if (payload.data) {
      // validar se é do tipo filme

      if ("title" in payload.data) {
        const content: IAddMovieToList = {
          mediaType: "movie",
          listType: payload.listType,
          movieId: payload.data.id,
          userId: payload.user.uid,
          poster: payload.data.poster_path,
          title: payload.data.title,
        };
        await saveItemToWatchListFB(content);

        const _data: IGetUserWatchList = {
          data: payload.data,
          mediaType: payload.mediaType,
          user: payload.user,
        };

        const response = await getUserWatchList(_data);
        return response;

        // validar se é do tipo série
      } else if ("name" in payload.data) {
        const content: IAddMovieToList = {
          mediaType: "tv",
          listType: payload.listType,
          movieId: payload.data.id,
          userId: payload.user.uid,
          poster: payload.data.poster_path,
          title: payload.data.name,
        };

        const _data: IGetUserWatchList = {
          data: payload.data,
          mediaType: payload.mediaType,
          user: payload.user,
        };

        await saveItemToWatchListFB(content);
        const response = await getUserWatchList(_data);
        return response;
      }
    } else {
      alert("movie required");
    }
  } else {
    alert("login required");
  }
};

// - - - - - - - - - - - SET WATCH LIST FB - - - - - - - - - - - - - - - - - - //
/**
 * Adiciona uma watch list ou atualiza a existente
 * @param content recebe mediaType, listType, movieId, userId, poster e title
 */
const saveItemToWatchListFB = async (content: IAddMovieToList) => {
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
  }
};

// - - - - - - - - - - - GET WATCH LIST - - - - - - - - - - - - - - - - - - //
/**
 *
 * @param payload movie, mediaType, user
 * @returns retorna a lista do usuário
 */
export const getUserWatchList = async (payload: IGetUserWatchList) => {
  if (payload.user) {
    //
    if (payload.data) {
      const response = await getUserWatchListFB({
        userId: payload.user.uid,
        movieId: payload.data.id,
        fullList: false,
        mediaType: payload.mediaType,
      });

      return response;
    } else {
      alert("get user watch list, error, data");
    }
  } else {
    alert("get user watch list, error, user");
  }
};

// - - - - - - - - - - - GET WATCH LIST FB - - - - - - - - - - - - - - - - - - //
/**
 *
 * @param content user, data, mediaType
 * @returns a watch list do usuário
 */
export const getUserWatchListFB = async (
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

// - - - - - - - - - - - SET TV SEASON - - - - - - - - - - - - - - - - - - - - - //
/**
 *
 * @param content mediaType, listType, movieId, userId, poster, title, seasons[]
 */
export const saveTvSeasonFB = async (content: IAddTvToList) => {
  let _exists = false;
  let _docId = null;

  const q = query(
    collection(db, COLLECTION_TRACKER),
    where("userId", "==", content.userId),
    where("movieId", "==", content.movieId)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    _exists = doc.exists();
    _docId = doc.id;
  });

  if (!_exists) {
    const docRef = await addDoc(collection(db, COLLECTION_TRACKER), content);
    // TODO: remover se não for necessário
    // update list
  } else if (_exists && _docId) {
    // update list
    const docRef = doc(db, COLLECTION_TRACKER, _docId);
    await updateDoc(docRef, {
      seasons: content.seasons,
    });
  } else {
    alert(ERROR_F_AD_TV_LS);
  }
};

// - - - - - - - - - - - SET LISTS - - - - - - - - - - - - - - - - - - - - - - - //
/**
 *
 * @param payload name, description, isPublic, list[], userId
 */
export const saveNewListFB = async (payload: IList) => {
  let _exists = false;
  let _docId = null;
  const q = query(
    collection(db, COLLECTION_LIST),
    where("userId", "==", payload.userId),
    where("name", "==", payload.name)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    _exists = doc.exists();
    _docId = doc.id;
  });

  if (!_exists) {
    // add new list
    const docRef = await addDoc(collection(db, COLLECTION_LIST), payload);
  } else if (_exists && _docId) {
    // update list
    alert("[saveNewListFB] - Esta lista já foi criada.");
    // const docRef = doc(db, COLLECTION_LIST, _docId);
    // await updateDoc(docRef, {
    //   list: [{ movieId: 347181, poster: "5UaMtHDN4OnALvm19KCO0kPMYwm.jpg" }],
    // });
  } else {
    alert("ERROR_F_AD_MV_LS");
  }
};

// - - - - - - - - - - - GET LISTS - - - - - - - - - - - - - - - - - - - - - - - //
/**
 * Busca as listas do usuário no FB
 * @param content fullList, userId, id
 * @returns um objeto userLists, com a lista
 */
export const getUserListsFB = async (
  content: IUserList
): Promise<{ userLists: DocumentData[] }> => {
  const _query = query(
    collection(db, COLLECTION_LIST),
    where("userId", "==", content.userId)
  );

  const querySnapshot = await getDocs(_query);
  const userLists: DocumentData[] = [];

  querySnapshot.forEach((doc) => {
    userLists.push({ id: doc.id, ...doc.data() });
  });

  return { userLists };
};

/**
 * Busca o item da watch list do usuário
 * @param content mediaType, data, user
 * @returns um único item
 * { userWatchList: response.movieList[0] }
 * ou { userWatchList: response.tvList[0] }
 */
export const getUserWatchListsFB = async (
  content: IGetUserWatchList
): Promise<DocumentData | null> => {
  if (content.user) {
    if (content.data) {
      const _data: IGetUserWatchList = {
        data: content.data,
        mediaType: content.mediaType,
        user: content.user,
      };

      const response = await getUserWatchList(_data);
      if (!response) {
        alert("[handleGetUserWatchList] - response not found");
        return null;
      }
      if (content.mediaType === "movie" && response.movieList.length > 0) {
        return { userWatchList: response.movieList[0] };
      }
      if (content.mediaType === "tv" && response.tvList.length > 0) {
        return { userWatchList: response.tvList[0] };
      }
    } else {
      alert("[getMovieList] - movie not found");
    }
  } else {
    alert("[getMovieList] - user not found");
  }

  return null;
};

/**
 * Remove o documento pelo id
 * @param id id do filme/série
 */
export const deleteListByIdFB = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_LIST, id));
};
