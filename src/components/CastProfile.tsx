import { Card, Icon, Image } from "semantic-ui-react";
import { ICast } from "../abstract/interfaces";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const profileDefaultUrl = import.meta.env.VITE_PROFILE_DEFAULT_URL;

const CastProfile = ({ cast }: { cast: ICast }) => {
  return (
    <Card>
      {cast.profile_path ? (
        <Image src={`${apiPosterUrl}${cast.profile_path}`} wrapped ui={false} />
      ) : (
        <Image src={profileDefaultUrl} wrapped ui={false} />
      )}
      <Card.Content>
        <Card.Header>{cast.name}</Card.Header>
        <Card.Meta>
          <span className="date">Personagem: {cast.character}</span>
        </Card.Meta>
        <Card.Description></Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="like" />
          {cast.popularity}
        </a>
      </Card.Content>
    </Card>
  );
};

export default CastProfile;
