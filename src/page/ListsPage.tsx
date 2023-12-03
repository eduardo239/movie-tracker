import { useEffect, useState } from "react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  IGetUserMovieList,
  IList,
  IUserList,
  IGetUserWatchList,
} from "../abstract/interfaces";
import { Tab, Table, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import ListItemType from "../components/ListItemType";
import { splitAndAddEllipsis } from "../helper";
import ModalCreateList from "../components/ModalCreateList";
import TableDataListHeader from "../components/TableDataListHeader";
import TableDataListBody from "../components/TableDataListBody";
import { getUserWatchListFB } from "../fetch/firebase";

const ListPage = () => {
  const navigate = useNavigate();

  const { handleGetUserLists } = useMovie();

  const { user } = useAuth();

  const [userMovieList, setUserMovieList] = useState<DocumentData[]>([]);
  const [userLists, setUserLists] = useState<DocumentData[]>([]);
  const [userTvList, setUserTvList] = useState<DocumentData[]>([]);

  const panes = [
    {
      menuItem: "Movies",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <Table celled compact selectable size="small" inverted>
            <TableDataListHeader />
            <TableDataListBody list={userMovieList} />
          </Table>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "TV",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <Table celled compact selectable size="small" inverted>
            <TableDataListHeader />
            <TableDataListBody list={userTvList} />
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
                <Table.HeaderCell textAlign="left">Nome</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign="left">
                  Itens
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
                    123
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => navigate(`/list?id=${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.description
                      ? splitAndAddEllipsis(item.description, 70)
                      : "..."}
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

  const fetchUserWatchList = async () => {
    if (user) {
      const payload: IGetUserMovieList = {
        fullList: true,
        userId: user.uid,
        mediaType: "movie",
      };
      const response = await getUserWatchListFB(payload);
      if (!response) {
        return;
      }
      setUserTvList(response.tvList);
      setUserMovieList(response.movieList);
    }
  };

  const fetchUserLists = () => {
    if (user) {
      const payload: IUserList = {
        userId: user.uid,
        fullList: true,
      };

      (async () => {
        const response = await handleGetUserLists(payload);

        if (!response) {
          return;
        }
        setUserLists(response.userLists);
      })();
    }
  };

  useEffect(() => {
    fetchUserWatchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // user lists
  useEffect(() => {
    fetchUserLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="grid-list">
      <Tab
        menu={{
          color: "orange",
          attached: false,
          tabular: false,
          inverted: true,
        }}
        panes={panes}
      />
      <ModalCreateList fetchUserLists={fetchUserLists} />
    </div>
  );
};

export default ListPage;
