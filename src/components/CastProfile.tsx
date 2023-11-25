import { Card, Icon, Image } from "semantic-ui-react";
import { ICast } from "../abstract/interfaces";
import { Link, useNavigate } from "react-router-dom";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const profileDefaultUrl = import.meta.env.VITE_FIREBASE_PROFILE_DEFAULT_URL;

const CastProfile = ({ cast }: { cast: ICast }) => {
  const navigate = useNavigate();

  return (
    <Link to={`/person/${cast.id}`}>
      <div className="app-card">
        <div className="app-card-header">
          {cast.profile_path ? (
            <img
              className="poster"
              src={`${apiPosterUrl}${cast.profile_path}`}
            />
          ) : (
            <img className="poster" src={profileDefaultUrl} />
          )}
        </div>
        <div className="app-card-body">
          <h4>{cast.name}</h4>
          <span className="opacity-6">Personagem: {cast.character}</span>
        </div>
        <div className="app-card-extra">
          <Icon name="like" /> {cast.popularity}
        </div>
      </div>
    </Link>
  );
};

export default CastProfile;
