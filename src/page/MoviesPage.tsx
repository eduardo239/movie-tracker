import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovie } from "../context/MovieContext";
import DataGroup from "../components/DataGroup";
import LoadingInfo from "../components/Elements/LoadingInfo";
import MessageInfo from "../components/Info/Message";
import PaginationBar from "../components/PaginationBar";
import GridContainer from "../components/Layout/GridContainer";
import MessageNotFound from "../components/Info/MessageNotFound";

const MoviePage = () => {
  const {
    data,
    loading,
    error,

    page,
    setPage,

    mediaType,
    setMediaType,

    userTrackerTv,
    userTrackerMovie,
  } = useMovie();

  const [params, _] = useSearchParams();

  useEffect(() => {
    setMediaType("movie");
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
          <MessageNotFound message="Filme não encontrado" />
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
