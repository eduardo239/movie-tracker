import { useEffect, useState } from "react";
import { ICredits, ITvDetails } from "../abstract/interfaces";
import { fetchCast } from "../fetch/tmdb";
import { Header, Segment } from "semantic-ui-react";

const MovieCast = ({ data }: { data: ITvDetails }) => {
  const [credits, setCredits] = useState<ICredits | null>(null);

  useEffect(() => {
    (async () => {
      const f = await fetchCast("movie", data.id + "");
      setCredits(f.data);
    })();
  }, [data]);

  return (
    <Segment basic>
      <Header as="h2">Info</Header>
      <div>
        <p>Release Date: {data.first_air_date}</p>
        <p>Status: {data.status}</p>
      </div>

      <Header as="h2">Cast</Header>
      {credits && (
        <>
          <p>{credits.cast.length > 0 && credits.cast[0].name}</p>
          <p>{credits.cast.length > 1 && credits.cast[1].name}</p>
          <p>{credits.cast.length > 2 && credits.cast[2].name}</p>
          <p>{credits.cast.length > 3 && credits.cast[3].name}</p>
        </>
      )}
    </Segment>
  );
};

export default MovieCast;
