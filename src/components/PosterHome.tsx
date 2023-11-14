import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";

const posterDefault = import.meta.env.VITE_POSTER_DEFAULT;

const PosterHome = ({ id, poster }: { id: number; poster: string | null }) => {
  const { mediaType } = useMovie();

  return (
    <Link to={`/${mediaType}?id=${id}`}>
      {poster ? (
        <Image src={`https://image.tmdb.org/t/p/w500${poster}`} size="medium" />
      ) : (
        <Image src={posterDefault} size="medium" />
      )}
    </Link>
  );
};

export default PosterHome;
