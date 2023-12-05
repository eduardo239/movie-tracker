import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Header,
  Icon,
  Image,
  Table,
} from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { IUserList } from "../abstract/interfaces";

const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const ListsPage = () => {
  const navigate = useNavigate();

  const { handleGetUserLists } = useMovie();
  const { user } = useAuth();

  const [userLists, setUserLists] = useState<DocumentData[]>([]);

  const fetchUserLists = async () => {
    if (user) {
      const payload: IUserList = {
        userId: user.uid,
        fullList: true,
      };

      const response = await handleGetUserLists(payload);
      if (!response) {
        alert("[fetchUserLists] - response not found");
        return;
      }
      setUserLists(response.userLists);
    }
  };

  // user lists
  useEffect(() => {
    if (user) fetchUserLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <Button.Group labeled icon compact color="orange">
        <Button icon="trash" content="Play" />
        <Button icon="close" content="Pause" />
        <Button icon="shuffle" content="Shuffle" />
      </Button.Group>{" "}
      <Button.Group labeled icon compact color="orange">
        <Button icon="list" content="Criar Lista" />
      </Button.Group>
      {/*  */}
      <Table celled color="orange" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Pública</Table.HeaderCell>
            <Table.HeaderCell width={2}>Quantidade</Table.HeaderCell>
            <Table.HeaderCell width={2}>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userLists.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell collapsing>
                <Checkbox onClick={(e, d) => console.log(d.checked)} />
              </Table.Cell>
              <Table.Cell
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/list?id=${item.id}`)}
              >
                <Header as="h4" image>
                  <Image
                    src={`${
                      item.list && item.list[0].poster_path
                        ? tmdbPosterUrl + item.list[0].poster_path
                        : fbPosterDefault
                    }`}
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    {item.name}
                    <Header.Subheader>
                      <small>ID: {item.id}</small>
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Icon name="unlock" /> {item.isPublic ? "Ok" : ""}
              </Table.Cell>
              <Table.Cell>
                <Icon name="chart line" /> {item.list ? item.list.length : 0}
              </Table.Cell>

              <Table.Cell negative>
                <Button size="mini" fluid>
                  Remover
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ListsPage;
