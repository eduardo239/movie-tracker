import { IPerson } from "../../abstract/interfaces";

const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const profileDefaultUrl = import.meta.env.VITE_FIREBASE_PROFILE_DEFAULT_URL;

const PersonPoster = ({ data }: { data: IPerson }) => {
  return (
    <img
      src={`${
        data.profile_path
          ? tmdbPosterUrl + data.profile_path
          : profileDefaultUrl
      }`}
      alt={data.name}
      className="poster-lg"
    />
  );
};

export default PersonPoster;
