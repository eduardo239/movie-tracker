import { Image } from "semantic-ui-react";

const DataPoster = ({ data }: { data: { poster_path: string | null } }) => {
  const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
  const posterDefault = import.meta.env.VITE_POSTER_DEFAULT_URL;

  if (data && data.poster_path)
    return (
      <Image
        src={`${apiPosterUrl}${data.poster_path}`}
        verticalAlign="middle"
      />
    );
  else return <Image src={posterDefault} verticalAlign="middle" />;
};

export default DataPoster;
