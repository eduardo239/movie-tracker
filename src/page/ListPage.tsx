import { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IGetUserMovieList, TListType } from "../abstract/interfaces";
import { Button, Divider, Tab, Table } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import ListItemType from "../components/ListItemType";

const ListPage = () => {
  const navigate = useNavigate();

  const { getUserMovieList } = useMovie();

  const { user } = useAuth();

  const [listType, setListType] = useState<TListType>("all");
  const [userMovieList, setUserMovieList] = useState<DocumentData[]>([]);
  const [userTvList, setUserTvList] = useState<DocumentData[]>([]);

  const panes = [
    {
      menuItem: "Movies",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <Table celled compact selectable size="small" inverted>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Vou Ver</Table.HeaderCell>
                <Table.HeaderCell>Já Vi</Table.HeaderCell>
                <Table.HeaderCell>Bloqueado</Table.HeaderCell>
                <Table.HeaderCell>Tipo</Table.HeaderCell>
                <Table.HeaderCell>Opções</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {userMovieList.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell
                    onClick={() => navigate(`/movie?id=${item.movieId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.movieId}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => navigate(`/movie?id=${item.movieId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.title}
                  </Table.Cell>

                  <ListItemType listType={item.listType} />
                  <Table.Cell>{item.mediaType}</Table.Cell>
                  <Table.Cell textAlign="center" style={{ padding: "2px" }}>
                    <Button.Group compact>
                      <Button inverted>remove</Button>
                      <Button inverted>remove</Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "TV",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <Table celled compact selectable size="small" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2} textAlign="left">
                  ID
                </Table.HeaderCell>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="center">
                  Vou Ver
                </Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="center">
                  Já Vi
                </Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="center">
                  Bloqueado
                </Table.HeaderCell>
                {/* <Table.HeaderCell>Tipo</Table.HeaderCell> */}
                <Table.HeaderCell width={3} textAlign="center">
                  Opções
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {userTvList.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell
                    onClick={() => navigate(`/tv?id=${item.movieId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.movieId}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => navigate(`/tv?id=${item.movieId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.title}
                  </Table.Cell>

                  <ListItemType listType={item.listType} />
                  {/* <Table.Cell>{item.mediaType}</Table.Cell> */}

                  <Table.Cell textAlign="center" style={{ padding: "2px" }}>
                    <div className="flex gap-sm">
                      <button className="app-button app-button__small">
                        Remover
                      </button>
                      <button className="app-button app-button__small">
                        Atualizar
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    if (user) {
      const payload: IGetUserMovieList = {
        userId: user.uid,
        movieId: 1,
        fullList: true,
      };

      (async () => {
        const response = await getUserMovieList(payload);
        setUserMovieList(response.movieList);
        setUserTvList(response.tvList);
      })();
    }
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
      <Tab
        menu={{
          color: "orange",
          attached: false,
          tabular: false,
          inverted: true,
        }}
        panes={panes}
      />
      <Divider />

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
    </>
  );
};

export default ListPage;
