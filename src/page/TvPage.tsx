import { useEffect } from "react";
import LoadingInfo from "../components/Elements/LoadingInfo";
import MessageInfo from "../components/Info/Message";
import { useMovie } from "../context/MovieContext";
import GridContainer from "../components/Layout/GridContainer";
import DataGroup from "../components/DataGroup";
import MessageNotFound from "../components/Info/MessageNotFound";
import PaginationBar from "../components/PaginationBar";

const MoviePage = () => {
  const {
    data,
    loading,
    error,
    page,
    mediaType,
    setMediaType,
    setPage,

    userTrackerTv,
    userTrackerMovie,
  } = useMovie();

  useEffect(() => {
    setMediaType("tv");

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <>
      <PaginationBar
        page={page}
        setPage={setPage}
        url={`/${mediaType}s?page=${page}`}
      />

      <GridContainer centered gap="gap-sm">
        <DataGroup
          data={data ? data.results : []}
          userTrackerList={
            mediaType === "movie" ? userTrackerMovie : userTrackerTv
          }
        />
        {data?.results.length === 0 && (
          <MessageNotFound message="Série não encontrado" />
        )}
      </GridContainer>

      <PaginationBar
        page={page}
        setPage={setPage}
        url={`/${mediaType}s?page=${page}`}
      />
    </>
  );
};

export default MoviePage;
