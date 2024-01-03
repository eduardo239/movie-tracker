import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Header,
  Icon,
  Image,
  Modal,
  Table,
} from "semantic-ui-react";
import { containsItemWithId, splitAndAddEllipsis } from "../../../helper";
import { useData } from "../../../context/DataContext";
import { useMovie } from "../../../context/MovieContext";

const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

type TTrackerBody = {
  list: DocumentData[];
  checkedList: DocumentData[];
  setCheckedList: React.Dispatch<React.SetStateAction<DocumentData[]>>;
};

const TrackerBody = ({ list, checkedList, setCheckedList }: TTrackerBody) => {
  const navigate = useNavigate();

  const { delUserTracker } = useData();
  const { handleGetUserTrackers } = useMovie();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const handleCheckedItem = (item: DocumentData) => {
    const exists = containsItemWithId(checkedList, item.id);
    if (exists) {
      const newArray = checkedList.filter((x) => x.id !== item.id);
      setCheckedList(newArray);
    } else {
      setCheckedList([...checkedList, item]);
    }
  };

  const handleOpenModal = (item: DocumentData) => {
    setOpen(true);
    setId(item.id);
  };

  const handleDeleteItem = async () => {
    if (id) {
      await delUserTracker(id);
      // atualizar
      // await handleFetchUserTracker();
      console.log(4);
      handleGetUserTrackers();
    }
    setOpen(false);
  };

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

      {list.map((item) => (
        <Table.Row key={item.id}>
          <Table.Cell collapsing>
            <Checkbox onClick={() => handleCheckedItem(item)} />
          </Table.Cell>
          <Table.Cell
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/${item.mediaType}?id=${item.dataId}`)}
          >
            <Header as="h4" image>
              <Image
                src={`${
                  item.poster ? tmdbPosterUrl + item.poster : fbPosterDefault
                }`}
                rounded
                size="mini"
              />
              <Header.Content>
                {item.title && item.title.length > 35
                  ? splitAndAddEllipsis(item.title)
                  : item.title}
                <Header.Subheader>
                  <small>ID: {item.dataId}</small>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>

          <Table.Cell
            textAlign="center"
            positive={item.listType === "saw"}
            negative={item.listType !== "saw"}
          >
            <Icon name={item.listType === "saw" ? "check" : "minus"} />
          </Table.Cell>
          <Table.Cell
            textAlign="center"
            positive={item.listType === "see"}
            negative={item.listType !== "see"}
          >
            <Icon name={item.listType === "see" ? "check" : "minus"} />
          </Table.Cell>
          <Table.Cell
            textAlign="center"
            positive={item.listType === "block"}
            negative={item.listType !== "block"}
          >
            <Icon name={item.listType === "block" ? "check" : "minus"} />
          </Table.Cell>
          <Table.Cell negative>
            <Button size="mini" fluid onClick={() => handleOpenModal(item)}>
              Remover
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TrackerBody;
