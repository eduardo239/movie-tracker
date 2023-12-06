import { Label, Segment } from "semantic-ui-react";
import { IGenre } from "../abstract/interfaces";
import { Link } from "react-router-dom";
import MessageNotFound from "./MessageNotFound";

type TDataGenre = { genres: IGenre[] };

const DataGenre = ({ genres }: TDataGenre) => {
  if (genres)
    return (
      <div className="p-4 app-dark-mode">
        <div className="flex gap-sm ">
          {genres.map((genre) => (
            <Link to={`/genre/${genre.id}`} key={genre.id}>
              <Label color="green" tag key={genre.id}>
                {genre.name}
              </Label>
            </Link>
          ))}
        </div>
      </div>
    );
  else return <MessageNotFound message="Gêneros não encontrados" />;
};

export default DataGenre;
