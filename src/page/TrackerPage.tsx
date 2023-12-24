import { useNavigate } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { TListType } from "../abstract/interfaces";
import TrackerBody from "../components/List/Tracker/TrackerBody";
import { useMovie } from "../context/MovieContext";
import { useData } from "../context/DataContext";

const TrackerPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { userTrackerTv, userTrackerMovie } = useMovie();
  const { getUserTrackers, delMultipleItems } = useData();
  const { handleGetUserTrackers } = useMovie();

  const [filteredList, setFilteredList] = useState<DocumentData[]>([]);
  const [checkedList, setCheckedList] = useState<DocumentData[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<"movie" | "tv">("movie");
  const [listType, setListType] = useState<TListType | null>(null);

  const handleFilter = (_listType: TListType | null) => {
    setListType(_listType);
    if (_listType !== null) {
      if (selectedMedia === "movie") {
        const fil1 = userTrackerMovie.filter((x) => x.listType === _listType);
        if (fil1.length > 0) setFilteredList(fil1);
        else setFilteredList([]);
      } else {
        const fil2 = userTrackerTv.filter((x) => x.listType === _listType);
        if (fil2.length > 0) setFilteredList(fil2);
        else setFilteredList([]);
      }
    } else {
      setFilteredList([]);
    }
  };

  const handleMultipleRemovals = async () => {
    await delMultipleItems({ list: checkedList, collection: "tracker" });
    handleGetUserTrackers();
  };

  const handleSelectMediaType = (media: "tv" | "movie") => {
    setListType(null);
    setSelectedMedia(media);
    navigate(`/tracker?type=${media}`);
    setFilteredList([]);
  };

  return (
    <>
      <Button.Group labeled icon compact color="orange">
        <Button
          icon="check"
          content="Todos"
          onClick={() => handleFilter(null)}
        />

        <Button
          icon="list"
          content="Vou Ver"
          onClick={() => handleFilter("saw")}
        />
        <Button
          icon="eye"
          content="Já Vi"
          onClick={() => handleFilter("see")}
        />
        <Button
          icon="close"
          content="Bloqueado"
          onClick={() => handleFilter("block")}
        />
      </Button.Group>{" "}
      <Button.Group labeled icon compact color="orange">
        <Button
          icon="film"
          content="Filmes"
          onClick={() => handleSelectMediaType("movie")}
        />
        <Button
          icon="tv"
          content="Séries"
          onClick={() => handleSelectMediaType("tv")}
        />
      </Button.Group>{" "}
      <Button.Group labeled icon compact color="red">
        <Button
          disabled={checkedList.length === 0}
          icon="trash"
          content="Remover"
          onClick={() => handleMultipleRemovals()}
        />
      </Button.Group>
      {/*  */}
      <Table celled color="orange" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
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
            <Table.HeaderCell width={2}>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredList.length === 0 && listType === null && (
            <TrackerBody
              list={
                selectedMedia === "movie" ? userTrackerMovie : userTrackerTv
              }
              checkedList={checkedList}
              setCheckedList={setCheckedList}
            />
          )}
          {(filteredList.length > 0 || listType !== null) && (
            <TrackerBody
              list={filteredList}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
            />
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default TrackerPage;
