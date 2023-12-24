import { Icon } from "semantic-ui-react";
import { ICast } from "../../abstract/interfaces";
import { Link } from "react-router-dom";
import {
  ERR_CHAR_NOT_FOUND,
  ERR_INFO_NOT_FOUND,
} from "../../abstract/constants";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const profileDefaultUrl = import.meta.env.VITE_FIREBASE_PROFILE_DEFAULT_URL;

const PersonProfile = ({ cast }: { cast: ICast }) => {
  const renderPoster = () => {
    return cast.profile_path ? (
      <img className="poster" src={`${apiPosterUrl}${cast.profile_path}`} />
    ) : (
      <img className="poster" src={profileDefaultUrl} />
    );
  };

  if (cast)
    return (
      <Link to={`/person/${cast.id}`}>
        <div className="app-card">
          <div className="app-card-header">{renderPoster()}</div>
          <div className="app-card-body">
            <h4>{cast.name ? cast.name : ERR_INFO_NOT_FOUND}</h4>
            <span className="opacity-6">
              Personagem: {cast.character ? cast.character : ERR_CHAR_NOT_FOUND}
            </span>
          </div>
          <div className="app-card-extra">
            <Icon name="like" /> {cast.popularity}
          </div>
        </div>
      </Link>
    );
  else return null;
};

export default PersonProfile;
