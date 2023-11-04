export interface IMovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  status: string;
  adult: boolean;
  original_language: string;
  release_date: string;
}

export interface IMovieResults {
  page: number;
  results: IMovieDetails[];
  total_pages: number;
  total_results: number;
}

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

export interface IMovieTrailers {
  id: string;
  results: IMovieTrailer[] | [];
}

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

export interface IAddMovieToList {
  mediaType: "movie" | "tv";
  listType: IListType;
  movieId: string;
  userId: string;
  poster: string;
  title: string;
}

export interface IListType {
  see: boolean;
  saw: boolean;
  block: boolean;
}

export type TListType = "all" | "see" | "saw" | "block";

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICredits {
  cast: ICast[];
  crew: [];
  id: number;
}
