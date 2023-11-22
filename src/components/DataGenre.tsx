import { Label } from "semantic-ui-react";
import { IGenre } from "../abstract/interfaces";
import { Link } from "react-router-dom";

const DataGenre = ({ genres }: { genres: IGenre[] }) => {
  if (genres)
    return (
      <div>
        {genres.map((genre) => (
          <Link to={`/genre/${genre.id}`} key={genre.id}>
            <Label color="green" tag key={genre.id}>
              {genre.name}
            </Label>
          </Link>
        ))}
      </div>
    );
};

export default DataGenre;
