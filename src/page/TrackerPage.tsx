import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { IGetUserMovieList } from "../abstract/interfaces";
import { getUserWatchListFB } from "../fetch/firebase";
import TrackerBody from "../components/List/Tracker/TrackerBody";

const TrackerPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [params, _] = useSearchParams();

  const [userTrackerList, setUserTrackerList] = useState<DocumentData[]>([]);
  const [filteredList, setFilteredList] = useState<DocumentData[]>([]);

  const fetchUserWatchList = async () => {
    if (user) {
      const payload: IGetUserMovieList = {
        fullList: true,
        userId: user.uid,
        mediaType: "movie",
      };
      const response = await getUserWatchListFB(payload);
      if (!response) {
        alert("[fetchUserWatchList] - response not found");
        return;
      }
      const _type = params.get("type");
      if (_type == "tv") {
        setUserTrackerList(response.tvList);
      } else {
        setUserTrackerList(response.movieList);
      }
    } else {
      alert("[fetchUserWatchList] - user not found");
    }
  };

  useEffect(() => {
    if (user) fetchUserWatchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, params]);

  const handleFilter = (listType: string) => {
    if (listType !== "") {
      setFilteredList(userTrackerList.filter((x) => x.listType === listType));
    } else {
      setFilteredList([]);
    }
  };

  return (
    <div>
      <Button.Group labeled icon compact color="orange">
        <Button icon="check" content="Todos" onClick={() => handleFilter("")} />

        <Button
          icon="eye"
          content="Já Vi"
          onClick={() => handleFilter("see")}
        />
        <Button
          icon="list"
          content="Vou Ver"
          onClick={() => handleFilter("saw")}
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
      </Button.Group>
      {/*  */}
      <Table celled color="orange" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Já Vi
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Vou Ver
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              Bloqueado
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredList.length === 0 && <TrackerBody list={userTrackerList} />}
          {filteredList.length > 0 && <TrackerBody list={filteredList} />}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TrackerPage;
