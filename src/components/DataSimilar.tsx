import useFetch from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import { Divider, Header } from "semantic-ui-react";
import { IMovieResults } from "../abstract/interfaces";
import LoadingInfo from "./LoadingInfo";
import MessageInfo from "./Message";
import GridContainer from "./GridContainer";
import DataGroup from "./DataGroup";
import TitleInfo from "./TitleInfo";

type TDataSimilar = { id: number };

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const DataSimilar = ({ id }: TDataSimilar) => {
  const { mediaType } = useMovie();

  const similarUrl = `${tmdbBaseUrl}/${mediaType}/${id}/similar?api_key=${apiKey}&language=pt-BR&include_adult=${false}&page=${1}`;

  const { data, loading, error } = useFetch<IMovieResults | null>(similarUrl);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        <TitleInfo center title="Mais Filmes/Séries" />
        <GridContainer centered gap="gap-sm">
          <DataGroup data={data ? data.results.slice(0, 10) : []} />
        </GridContainer>
      </>
    );
  else return null;
};

export default DataSimilar;
