import { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  IGetUserMovieList,
  IUserList,
  TListType,
} from "../abstract/interfaces";
import { Tab, Table, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import ListItemType from "../components/ListItemType";
import CreateList from "./CreateList";
import { splitAndAddEllipsis } from "../helper";

const ListPage = () => {
  const navigate = useNavigate();

  const { getUserMovieList, getUserLists } = useMovie();

  const { user } = useAuth();

  const [listType, setListType] = useState<TListType>("all");
  const [userMovieList, setUserMovieList] = useState<DocumentData[]>([]);
  const [userLists, setUserLists] = useState<DocumentData[]>([]);
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
                    <div className="flex flex-center gap-sm">
                      <button className="app-button app-button__small">
                        <Icon name="trash" />
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
                  <Table.Cell textAlign="center" style={{ padding: "2px" }}>
                    <div className="flex flex-center gap-sm">
                      <button className="app-button app-button__small">
                        <Icon name="trash" />
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
    {
      menuItem: "Minhas Listas",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <Table celled compact selectable size="small" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2} textAlign="left">
                  ID
                </Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="left">
                  Nome
                </Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="left">
                  Quantidade
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="left">Descrição</Table.HeaderCell>
                <Table.HeaderCell width={3} textAlign="center">
                  Opções
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {userLists.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell
                    onClick={() => navigate(`/list?id=${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <code>{item.id}</code>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => navigate(`/list?id=${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => navigate(`/list?id=${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.list.length}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => navigate(`/list?id=${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {splitAndAddEllipsis(item.description, 70)}
                  </Table.Cell>

                  <Table.Cell textAlign="center" style={{ padding: "2px" }}>
                    <div className="flex flex-center gap-sm">
                      <button className="app-button app-button__small">
                        <Icon name="trash" />
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, listType]);

  // user lists
  useEffect(() => {
    if (user) {
      const payload: IUserList = {
        userId: user.uid,
        fullList: true,
      };

      (async () => {
        const response = await getUserLists(payload);
        setUserLists(response);
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <CreateList />
      <Tab
        menu={{
          color: "orange",
          attached: false,
          tabular: false,
          inverted: true,
        }}
        panes={panes}
      />
    </div>
  );
};

export default ListPage;
