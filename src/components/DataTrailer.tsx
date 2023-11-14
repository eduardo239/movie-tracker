import { Button, Segment } from "semantic-ui-react";
import { ITrailers } from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { fetchTrailers } from "../fetch/tmdb";
import { useMovie } from "../context/MovieContext";

const DataTrailer = ({
  id,
  mediaType,
}: {
  id: string;
  mediaType: "movie" | "tv";
}) => {
  const [trailers, setTrailers] = useState<ITrailers>();
  const [keyTrailer, setKeyTrailer] = useState("");

  const handleTrailerChange = (id: string) => setKeyTrailer(id);

  useEffect(() => {
    (async () => {
      if (id) {
        const result = await fetchTrailers(mediaType, id);
        setTrailers(result.data);
      }
    })();
  }, [id, mediaType]);

  useEffect(() => {
    if (trailers && trailers.results.length > 0) {
      const _key = trailers.results[trailers.results.length - 1].key;
      setKeyTrailer(_key);
    }

    return () => {};
  }, [trailers]);

  if (trailers)
    return (
      <Segment basic style={{ padding: "0" }}>
        <div className="trailer">
          <iframe
            title="movie-trailer"
            src={`https://www.youtube.com/embed/${keyTrailer}`}
            allowFullScreen
          />
        </div>
        <Segment>
          {trailers?.results
            .map((x) => (
              <Button
                style={{ marginBottom: ".25rem" }}
                onClick={() => handleTrailerChange(x.key)}
                key={x.key}
              >
                {x.name}
              </Button>
            ))
            .splice(-5)
            .reverse()}
        </Segment>
      </Segment>
    );
};

export default DataTrailer;
