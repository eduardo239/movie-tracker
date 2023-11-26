import { useEffect } from "react";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { useMovie } from "../context/MovieContext";
import Pagination_ from "../components/Pagination_";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";

const MoviePage = () => {
  const { data, loading, error, page, mediaType, setMediaType, setPage } =
    useMovie();

  useEffect(() => {
    setMediaType("movie");
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
        <DataGroup data={data ? data.results : []} mediaType={mediaType} />
      </GridContainer>
      <Pagination_ />
    </>
  );
};

export default MoviePage;
