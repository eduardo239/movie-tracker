import { Image } from "semantic-ui-react";

const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const DataPoster = ({ data }: { data: { poster_path: string } }) => {
  if (data)
    return (
      <Image
        src={`${apiPosterUrl}${data.poster_path}`}
        verticalAlign="middle"
      />
    );
};

export default DataPoster;
