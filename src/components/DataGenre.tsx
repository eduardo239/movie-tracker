import { Label } from "semantic-ui-react";
import { IGenre } from "../abstract/interfaces";

const DataGenre = ({ genres }: { genres: IGenre[] }) => {
  if (genres)
    return (
      <div>
        {genres.map((genre) => (
          <Label key={genre.id} as="a" color="black" tag>
            {genre.name}
          </Label>
        ))}
      </div>
    );
};

export default DataGenre;
