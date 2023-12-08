import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Confirm,
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
import ModalCreateList from "../components/ModalCreateList";
import { containsItemWithId } from "../helper";
import IconWithLabel from "../components/IconWithLabel";

const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const ListsPage = () => {
  const navigate = useNavigate();

  const { handleGetUserLists, handleDeleteList } = useMovie();
  const { user } = useAuth();

  const [userLists, setUserLists] = useState<DocumentData[]>([]);
  const [selectedItems, setSelectedItems] = useState<DocumentData[]>([]);
  const [open, setOpen] = useState(false);
  const [idToRemove, setIdToRemove] = useState<string | null>(null);

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

  const handleCheckedItems = (item: DocumentData) => {
    const _contains = containsItemWithId(selectedItems, item.id);
    if (_contains) {
      const _filter = selectedItems.filter((x) => x.id !== item.id);
      setSelectedItems(_filter);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleOpenModal = (item: DocumentData) => {
    setOpen(true);
    setIdToRemove(item.id);
  };

  const handleRemoveItem = () => {
    if (idToRemove) {
      handleDeleteList(idToRemove);
    }
    fetchUserLists();
    setOpen(false);
  };

  // https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=pt#node.js_2

  useEffect(() => {
    if (user) fetchUserLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <Confirm
        open={open}
        content="Tem certeza que deseja remover?"
        cancelButton="Não"
        confirmButton="Sim"
        onCancel={() => setOpen(false)}
        onConfirm={() => handleRemoveItem()}
      />
      <Button.Group labeled icon compact color="orange">
        <Button icon="trash" content="Play" />
        <Button icon="close" content="Pause" />
        <Button icon="shuffle" content="Shuffle" />
      </Button.Group>
      {"  "}
      <Button.Group labeled icon compact color="orange">
        <ModalCreateList fetchUserLists={fetchUserLists} />
      </Button.Group>
      {/*  */}
      <Table celled color="orange" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell width={2}>Pública</Table.HeaderCell>
            <Table.HeaderCell width={2}>Itens</Table.HeaderCell>
            <Table.HeaderCell width={1}>Opções</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userLists.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell collapsing>
                <Checkbox onClick={() => handleCheckedItems(item)} />
              </Table.Cell>
              <Table.Cell
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/list?id=${item.id}`)}
              >
                <Header as="h4" image>
                  <Image
                    src={`${
                      item.list && item.list[0] && item.list[0].poster_path
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
              <Table.Cell positive={item.isPublic} negative={!item.isPublic}>
                <IconWithLabel
                  iconName={item.isPublic ? "unlock" : "lock"}
                  label={item.isPublic ? "Pública" : "Privada"}
                />
              </Table.Cell>
              <Table.Cell>
                <IconWithLabel
                  iconName="chart line"
                  label={item.list && item.list.length}
                />
              </Table.Cell>

              <Table.Cell negative>
                <Button size="mini" fluid onClick={() => handleOpenModal(item)}>
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
