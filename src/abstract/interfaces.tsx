export interface MovieDetails {
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

export interface MovieTrailer {
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

export interface MovieTrailers {
  id: string;
  results: MovieTrailer[] | [];
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
export interface UserAuthForm {
  label: string;
  id: string;
  type?: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}
