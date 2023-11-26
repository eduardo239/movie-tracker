import { Button, Icon, Segment } from "semantic-ui-react";
import { ITrailers } from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { fetchTrailers } from "../fetch/tmdb";
import LoadingInfo from "./LoadingInfo";
import useFetch from "../hooks/useFetch";
import MessageInfo from "./Message";

const DataTrailer = ({
  id,
  mediaType,
}: {
  id: string;
  mediaType: "movie" | "tv";
}) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

  const trailerUrl = `${tmdbBaseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`;

  const { data, loading, error } = useFetch<ITrailers | null>(trailerUrl);

  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailerChange = (id: string) => setTrailerKey(id);

  useEffect(() => {
    if (data && data.results.length > 0) {
      setTrailerKey(data.results[data.results.length - 1].key);
    }
    return () => {};
  }, [data]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        {data?.results.length > 0 ? (
          <div className="trailer">
            <iframe
              title="movie-trailer"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        ) : (
          <p className="flex flex-center">
            <Icon name="exclamation" /> Trailer não encontrado
          </p>
        )}
        <div className="flex flex-center p-2">
          {data?.results.length > 0 &&
            data?.results
              .map((x) => (
                <button
                  className="app-button app-button__small app-button__dark"
                  onClick={() => handleTrailerChange(x.key)}
                  key={x.key}
                >
                  {x.name}
                </button>
              ))
              .splice(-5)
              .reverse()}
        </div>
      </>
    );
  else return null;
};

export default DataTrailer;
