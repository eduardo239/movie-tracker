import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Header,
  Icon,
  Image,
  Table,
} from "semantic-ui-react";
import { containsItemWithId } from "../../../helper";

const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const TrackerBody = ({
  list,
  checkedList,
  setCheckedList,
}: {
  list: DocumentData[];
  checkedList: DocumentData[];
  setCheckedList: React.Dispatch<React.SetStateAction<DocumentData[]>>;
}) => {
  const navigate = useNavigate();

  const handleCheckedItem = (item: DocumentData) => {
    const exists = containsItemWithId(checkedList, item.id);
    if (exists) {
      const newArray = checkedList.filter((x) => x.id !== item.id);
      setCheckedList(newArray);
    } else {
      setCheckedList([...checkedList, item]);
    }
  };

  return (
    <>
      {list.map((item) => (
        <Table.Row key={item.id}>
          <Table.Cell collapsing>
            <Checkbox onClick={() => handleCheckedItem(item)} />
          </Table.Cell>
          <Table.Cell
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/${item.mediaType}?id=${item.movieId}`)}
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
                {item.title}
                <Header.Subheader>
                  <small>ID: {item.movieId}</small>
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
            <Button size="mini" fluid>
              Remover
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TrackerBody;
