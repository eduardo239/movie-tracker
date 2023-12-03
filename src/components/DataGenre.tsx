import { Label, Segment } from "semantic-ui-react";
import { IGenre } from "../abstract/interfaces";
import { Link } from "react-router-dom";
import MessageNotFound from "./MessageNotFound";

type TDataGenre = { genres: IGenre[] };

const DataGenre = ({ genres }: TDataGenre) => {
  if (genres)
    return (
      <Segment inverted>
        <div className="flex gap-sm ">
          {genres.map((genre) => (
            <Link to={`/genre/${genre.id}`} key={genre.id}>
              <Label color="green" tag key={genre.id}>
                {genre.name}
              </Label>
            </Link>
          ))}
        </div>
      </Segment>
    );
  else return <MessageNotFound message="Gêneros não encontrados" />;
};

export default DataGenre;
