import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Header,
  Icon,
  Image,
  Table,
} from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { IGetUserMovieList, IUserList } from "../abstract/interfaces";
import { getUserWatchListFB } from "../fetch/firebase";

const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const TrackerPage = () => {
  const navigate = useNavigate();

  const [params, _] = useSearchParams();

  const { user } = useAuth();

  const [userTrackerList, setUserTrackerList] = useState<DocumentData[]>([]);

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

  return (
    <div>
      <Button.Group labeled icon compact color="orange">
        <Button icon="trash" content="Play" />
        <Button icon="close" content="Pause" />
        <Button icon="shuffle" content="Shuffle" />
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
            <Table.HeaderCell width={2}>Vou Ver</Table.HeaderCell>
            <Table.HeaderCell width={2}>Já Vi</Table.HeaderCell>
            <Table.HeaderCell width={2}>Bloqueado</Table.HeaderCell>
            <Table.HeaderCell width={2}>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userTrackerList.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell collapsing>
                <Checkbox onClick={(e, d) => console.log(d.checked)} />
              </Table.Cell>
              <Table.Cell
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/${item.mediaType}?id=${item.movieId}`)
                }
              >
                <Header as="h4" image>
                  <Image
                    src={`${
                      item.poster
                        ? tmdbPosterUrl + item.poster
                        : fbPosterDefault
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
                positive={item.listType === "see"}
                negative={item.listType !== "see"}
              >
                <Icon name={item.listType === "see" ? "check" : "minus"} />
              </Table.Cell>
              <Table.Cell
                positive={item.listType === "saw"}
                negative={item.listType !== "saw"}
              >
                <Icon name={item.listType === "saw" ? "check" : "minus"} />
              </Table.Cell>
              <Table.Cell
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
        </Table.Body>
      </Table>
    </div>
  );
};

export default TrackerPage;
