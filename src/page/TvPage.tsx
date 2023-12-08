import { useEffect } from "react";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { useMovie } from "../context/MovieContext";
import Pagination_ from "../components/Pagination_";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";
import MessageNotFound from "../components/MessageNotFound";

const MoviePage = () => {
  const { data, loading, error, page, mediaType, setMediaType, setPage } =
    useMovie();

  useEffect(() => {
    setMediaType("tv");
    if (page && page !== 1) setPage(page);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <>
      <Pagination_ />
      <GridContainer centered gap="gap-sm">
        <DataGroup data={data ? data.results : []} />
        {data?.results.length === 0 && (
          <MessageNotFound message="Série não encontrado" />
        )}
      </GridContainer>
      <Pagination_ />
    </>
  );
};

export default MoviePage;
