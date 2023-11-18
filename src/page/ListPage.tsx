import { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiTrash, FiCheck, FiMinus } from "react-icons/fi";
import { TListType } from "../abstract/interfaces";
import { Button, Icon, Table } from "semantic-ui-react";

const ListPage = () => {
  const navigate = useNavigate();

  const { getUserMovieList } = useMovie();

  const { user } = useAuth();

  const [listType, setListType] = useState<TListType>("all");

  useEffect(() => {
    if (user) {
      if (listType === "all") {
        // getUserMovieList(user.uid, listType, true);
      } else {
        // getUserMovieList(user.uid, listType, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, listType]);

  return (
    <>
      <Button.Group>
        <Button
          color={`${listType === "all" ? "orange" : "black"}`}
          onClick={() => setListType("all")}
        >
          Todos
        </Button>
        <Button
          color={`${listType === "see" ? "orange" : "black"}`}
          onClick={() => setListType("see")}
        >
          Para Ver
        </Button>
        <Button
          color={`${listType === "saw" ? "orange" : "black"}`}
          onClick={() => setListType("saw")}
        >
          Já Vi
        </Button>
        <Button
          color={`${listType === "block" ? "orange" : "black"}`}
          onClick={() => setListType("block")}
        >
          Bloquear
        </Button>
      </Button.Group>

      <Table celled compact>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Para Ver</Table.HeaderCell>
            <Table.HeaderCell>Já Vi</Table.HeaderCell>
            <Table.HeaderCell>Bloquear</Table.HeaderCell>
            <Table.HeaderCell>Remover</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {/* {movies &&
            movies.map((movie) => (
              <Table.Row key={movie.id}>
                <Table.Cell>{movie.movieId}</Table.Cell>
                <Table.Cell>
                  <Link to={`/movie?id=${movie.movieId}`}>{movie.title}</Link>
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  negative={!movie.listType.see}
                  positive={movie.listType.see}
                >
                  <Icon
                    name={`${movie.listType.see ? "checkmark" : "minus"}`}
                  />
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  negative={!movie.listType.saw}
                  positive={movie.listType.saw}
                >
                  <Icon
                    name={`${movie.listType.saw ? "checkmark" : "minus"}`}
                  />
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  negative={!movie.listType.block}
                  positive={movie.listType.block}
                >
                  <Icon
                    name={`${movie.listType.block ? "checkmark" : "minus"}`}
                  />
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button size="small" color="red">
                    <Icon name="delete" />
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))} */}
        </Table.Body>
      </Table>
    </>
  );
};

export default ListPage;
