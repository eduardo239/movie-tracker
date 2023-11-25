import { Label, Segment } from "semantic-ui-react";
import { IGenre } from "../abstract/interfaces";
import { Link } from "react-router-dom";

const DataGenre = ({ genres }: { genres: IGenre[] }) => {
  if (genres)
    return (
      <Segment inverted>
        <div className="flex gap-sm flex-center">
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
};

export default DataGenre;
