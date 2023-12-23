import useFetch from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import { Button, Divider, Header } from "semantic-ui-react";
import { IMovieResults } from "../abstract/interfaces";
import LoadingInfo from "./Elements/LoadingInfo";
import MessageInfo from "./Info/Message";
import GridContainer from "./Layout/GridContainer";
import DataGroup from "./DataGroup";
import TitleInfo from "./Elements/TitleInfo";
import { useState } from "react";
import { useData } from "../context/DataContext";

type TDataSimilar = { id: number };

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const DataSimilar = ({ id }: TDataSimilar) => {
  const { mediaType, userTrackerList } = useMovie();
  // const { userTrackerList } = useData();

  const similarUrl = `${tmdbBaseUrl}/${mediaType}/${id}/similar?api_key=${apiKey}&language=pt-BR&include_adult=${false}&page=${1}`;

  const { data, loading, error } = useFetch<IMovieResults | null>(similarUrl);

  const [length, setLength] = useState(5);

  const handleChangeLength = (_length: number) => {
    if (length + _length <= 4) {
      return;
    }
    setLength(length + _length);
  };

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        <TitleInfo center title="Mais Filmes/Séries" />
        <GridContainer centered gap="gap-sm">
          <DataGroup
            data={data ? data.results.slice(0, length) : []}
            userTrackerList={userTrackerList}
          />
        </GridContainer>
        <div className="p-3">
          <Button.Group>
            <Button size="tiny" onClick={() => handleChangeLength(-5)}>
              Ver Menos
            </Button>
            <Button size="tiny" onClick={() => handleChangeLength(5)}>
              Ver Mais
            </Button>
          </Button.Group>
        </div>
      </>
    );
  else return null;
};

export default DataSimilar;
