import { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiTrash, FiClock, FiCheck, FiMinus } from "react-icons/fi";
import { TListType } from "../abstract/interfaces";

const ListPage = () => {
  const navigate = useNavigate();
  const { movieList: movies, getUserMovieList, deleteMovie } = useMovie();
  const { user } = useAuth();

  const [listType, setListType] = useState<TListType>("all");

  useEffect(() => {
    if (user) {
      if (listType === "all") {
        getUserMovieList(user.uid, listType, true);
      } else {
        getUserMovieList(user.uid, listType, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, listType]);

  return (
    <section>
      <div className="flex">
        <button className="btn btn-primary" onClick={() => setListType("all")}>
          All
        </button>
        <button className="btn btn-primary" onClick={() => setListType("see")}>
          See
        </button>
        <button className="btn btn-primary" onClick={() => setListType("saw")}>
          Saw
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setListType("block")}
        >
          Block
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>See</td>
            <td>Saw</td>
            <td>Block</td>
            <td>Media</td>
            <td colSpan={2}>Options</td>
          </tr>
        </thead>
        {movies &&
          movies.map((movie) => (
            <tbody key={movie.id}>
              <tr>
                <td>{movie.movieId}</td>
                <td>
                  <Link to={`/movies?id=${movie.movieId}`}>{movie.title}</Link>
                </td>
                <td>{movie.listType.see ? <FiCheck /> : <FiMinus />}</td>
                <td>{movie.listType.saw ? <FiCheck /> : <FiMinus />}</td>
                <td>{movie.listType.block ? <FiCheck /> : <FiMinus />}</td>
                <td>{movie.typeType}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      deleteMovie(movie.id, movie.userId, listType)
                    }
                  >
                    <FiTrash />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/movie?id=${movie.movieId}`)}
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </section>
  );
};

export default ListPage;
