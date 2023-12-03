// - - - - - - - - - - movie - - - - - - - - - -

import { User } from "firebase/auth";

export interface IMovieDetails {
  adult: boolean;
  id: number;
  title: string;
  overview: string;
  credits: {
    cast: ICast[];
    crew: [];
  };
  original_title: string;
  genres: IGenre[];
  poster_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  status: string;
  original_language: string;
  release_date: string;
}

export interface IMovieDetailsSimple {
  adult: false;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  media_type: "movie" | "tv";
  name: string;
  first_air_date: string;
}

export interface IMovieResults {
  page: number;
  results: IMovieDetails[];
  total_pages: number;
  total_results: number;
}

// - - - - - - - - - -  genre created network - - - -
export interface IGenre {
  id: number;
  name: string;
}
export interface ICreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
export interface INetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

// - - - - - - - - - -  tv - - - - - - - - - -
export interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
export interface ITvDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: ICreatedBy[];
  credits: {
    cast: ICast[];
    crew: [];
  };
  episode_run_time: [];
  first_air_date: string;
  genres: IGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  networks: INetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: ISeason[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
export interface ITvDetailsSimple {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: [];
  id: number;
  name: string;
  origin_country: [];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

// - - - - - - - - - - trailers - - - - - - - - - -
export interface IMovieTrailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
type TTrailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: string;
  id: string;
};
export interface ITrailers {
  id: string;
  results: TTrailer[];
}
// - - - - - - - - - - cast - - - - - - - - - -
export interface ICast {
  adult: boolean;
  cast_id?: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}
export interface ICredits {
  cast: ICast[];
  crew: [];
  id: number;
}
export interface IPerson {
  adult: boolean;
  also_known_as: [];
  biography: string;
  birthday: string;
  deathday: null;
  combined_credits: {
    cast: [];
    crew: [];
  };
  gender: number;
  homepage: null;
  id: number;
  imdb_id: null;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}
export interface IPersonMovies {
  page: number;
  results: IMovieDetailsSimple[];
  total_pages: number;
  total_results: number;
}
export interface IPersonTvs {
  page: number;
  results: ITvDetailsSimple[];
  total_pages: number;
  total_results: number;
}
// - - - - - - - - - - type - - - - - - - - - -
export type TMediaType = "movie" | "tv";
export type TListType = "all" | "see" | "saw" | "block";

// - - - - - - - - - - payload add movie - - - - - - - - - -
export interface IAddMovieToList {
  mediaType: TMediaType;
  listType: TListType;
  movieId: number;
  userId: string;
  poster: string;
  title: string;
}
// - - - - - - - - - - payload add tv - - - - - - - - - -
export interface IAddTvToList {
  mediaType: "movie" | "tv";
  listType: TListType;
  movieId: number;
  userId: string;
  poster: string;
  title: string;
  seasons: number[];
}
// - - - - - - - - - - user list - - - - - - - - - -
export interface IGetUserMovieList {
  userId: string;
  movieId?: number;
  fullList: boolean;
  mediaType?: "movie" | "tv";
}
export interface ITrackerSeasons {
  episodes: ITrackerEpisodes[];
  season_number: number;
}
export interface ITrackerTv {
  data: ITrackerSeasons[];
}
export interface ITrackerEpisodes {
  episode_number: number;
  watched: boolean;
}
// - - - - - - - - - - list item - - - - - - - - - -
export interface TListItemData {
  id: number;
  name: string;
  poster_path: string;
  mediaType: "movie" | "tv";
}
export interface IList {
  name: string;
  description: string;
  isPublic: boolean;
  list?: TListItemData[];
  userId: string;
}
export interface IUserList {
  fullList?: boolean;
  userId: string;
  id?: string;
}
// - - - - - - - - - -  user - - - - - - - - - -
export interface IUserAuth {
  email: string;
  password: string;
  username?: string;
}
export interface IUser {
  username: string;
  email: string;
}
export interface IUserAuthForm {
  label: string;
  id: string;
  type?: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

//

export interface ISaveItemToWatchList {
  listType: TListType;
  data: IMovieDetails | ITvDetails | null;
  mediaType: TMediaType;
  user: null | User;
}

export interface IGetUserWatchList {
  mediaType: TMediaType;
  data: IMovieDetails | ITvDetails | null;
  user: null | User;
}

export interface ISaveListType {
  listType: TListType;
  data: IMovieDetails | ITvDetails | null;
  mediaType: TMediaType;
}
