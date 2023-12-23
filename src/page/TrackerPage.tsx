import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { TListType } from "../abstract/interfaces";
import TrackerBody from "../components/List/Tracker/TrackerBody";
import { useMovie } from "../context/MovieContext";
import { toast } from "react-toastify";
import {
  ERR_DOCUMENT_NOT_FOUND,
  ERR_RESPONSE_NOT_FOUND,
  ERR_USER_NOT_FOUND,
} from "../abstract/constants";
import { IGetUserTrackers } from "../abstract/interfaces2";
import { useData } from "../context/DataContext";

const TrackerPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { mediaType, userTrackerList, setUserTrackerList } = useMovie();
  const { getUserTrackers, delMultipleItems } = useData();

  const [params, _] = useSearchParams();
  const [filteredList, setFilteredList] = useState<DocumentData[]>([]);
  const [checkedList, setCheckedList] = useState<DocumentData[]>([]);

  const handleFilter = (listType: TListType | null) => {
    if (listType !== null) {
      setFilteredList(userTrackerList.filter((x) => x.listType === listType));
    } else {
      setFilteredList([]);
    }
  };

  const handleMultipleRemovals = async () => {
    await delMultipleItems({ list: checkedList, collection: "tracker" });
    await handleGetUserTracker();
  };

  const handleGetUserTracker = async () => {
    if (user) {
      const payload: IGetUserTrackers = {
        user,
        mediaType: mediaType ? mediaType : "movie",
      };
      const response = await getUserTrackers(payload);
      if (response) {
        const type = params.get("type");
        if (type == "tv") {
          setUserTrackerList(response.tvList);
        } else {
          setUserTrackerList(response.movieList);
        }
      } else {
        toast.error(ERR_DOCUMENT_NOT_FOUND);
      }
    }
  };

  useEffect(() => {
    if (user) handleGetUserTracker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, params, mediaType]);

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
          icon="tv"
          content="Séries"
          onClick={() => navigate(`/tracker?type=tv`)}
        />
        <Button
          icon="film"
          content="Filmes"
          onClick={() => navigate(`/tracker?type=movie`)}
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
          {filteredList.length === 0 && (
            <TrackerBody
              list={userTrackerList}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
              handleFetchUserTracker={handleGetUserTracker}
            />
          )}
          {filteredList.length > 0 && (
            <TrackerBody
              list={filteredList}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
              handleFetchUserTracker={handleGetUserTracker}
            />
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default TrackerPage;
