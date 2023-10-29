import { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiEye, FiTrash } from "react-icons/fi";

const ListPage = () => {
  const navigate = useNavigate();
  const { movieList: movies, getMovieList, deleteMovie } = useMovie();
  const { user } = useAuth();

  const [listType, setListType] = useState<"see" | "saw" | "block">("see");

  useEffect(() => {
    if (user) {
      getMovieList(user.uid, listType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, listType]);

  return (
    <section>
      <div className="flex">
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
            {/* <td>poster</td> */}
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
                {/* <td>
                <img
                  className="poster-sm"
                  src={movie.poster}
                  alt={movie.title}
                />
              </td> */}
                <td>{movie.movieId}</td>
                <td>{movie.title}</td>
                <td>{movie.list.see ? "true" : "false"}</td>
                <td>{movie.list.saw ? "true" : "false"}</td>
                <td>{movie.list.block ? "true" : "false"}</td>
                <td>{movie.type}</td>
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
                    onClick={() => navigate(`/movies?id=${movie.movieId}`)}
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
