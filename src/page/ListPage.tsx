import React, { useEffect } from "react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiTrash } from "react-icons/fi";

const ListPage = () => {
  const navigate = useNavigate();
  const { movieList: movies, getMovieList, deleteMovie } = useMovie();
  const { user } = useAuth();

  useEffect(() => {
    if (user) getMovieList(user.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <table>
      <thead>
        <tr>
          <td>poster</td>
          <td>id</td>
          <td>title</td>
          <td>list</td>
          <td>media</td>
          <td>delete</td>
          <td>see</td>
        </tr>
      </thead>
      {movies &&
        movies.map((movie) => (
          <tbody key={movie.id}>
            <tr>
              <td>
                <img
                  className="poster-sm"
                  src={movie.poster}
                  alt={movie.title}
                />
              </td>
              <td>{movie.movieId}</td>
              <td>{movie.title}</td>
              <td>{movie.list}</td>
              <td>{movie.type}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => deleteMovie(movie.id, movie.userId)}
                >
                  <FiTrash />
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/movies?id=${movie.movieId}`)}
                >
                  <FiEye />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
    </table>
  );
};

export default ListPage;
