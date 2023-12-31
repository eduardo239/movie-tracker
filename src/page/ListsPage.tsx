import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Header,
  Image,
  Modal,
  Table,
} from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import ModalCreateList from "../components/Modal/ModalCreateList";
import { containsItemWithId } from "../helper";
import IconWithLabel from "../components/Elements/IconWithLabel";
import { toast } from "react-toastify";
import { SUC_ITEMS_DELETED } from "../abstract/constants";
import { useData } from "../context/DataContext";

const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const ListsPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { getUserLists, delMultipleItems, delItemById } = useData();

  const [open, setOpen] = useState(false);
  const [userLists, setUserLists] = useState<DocumentData[]>([]);
  const [selectedItems, setSelectedItems] = useState<DocumentData[]>([]);
  const [id, setId] = useState<string | null>(null);

  const fetchUserLists = async () => {
    const response = await getUserLists();
    if (response) setUserLists(response);
    else return setUserLists([]);
  };

  const handleItemChecked = (item: DocumentData) => {
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
    setId(item.id);
  };

  const handleDeleteItem = async () => {
    if (id) {
      await delItemById({ id, collection: "list" });
      await fetchUserLists();
    }
    setOpen(false);
  };

  const handleDeleteMultipleItems = async () => {
    await delMultipleItems({ list: selectedItems, collection: "list" });
    await fetchUserLists();
    toast.success(SUC_ITEMS_DELETED);
  };

  useEffect(() => {
    if (user) fetchUserLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Modal size="tiny" open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Remover Lista</Modal.Header>
        <Modal.Content>
          <p className="app-dark-text">Tem certeza que deseja remover?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            No
          </Button>
          <Button positive onClick={() => handleDeleteItem()}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>

      <Button.Group labeled icon compact color="orange">
        <ModalCreateList fetchUserLists={fetchUserLists} />
      </Button.Group>
      {"  "}

      <Button.Group labeled icon compact color="red">
        <Button
          disabled={selectedItems.length === 0}
          icon="trash"
          content="Remover"
          onClick={() => handleDeleteMultipleItems()}
        />
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
                <Checkbox onClick={() => handleItemChecked(item)} />
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
    </>
  );
};

export default ListsPage;
