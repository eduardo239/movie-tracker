import { useEffect } from "react";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { useMovie } from "../context/MovieContext";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";
import MessageNotFound from "../components/MessageNotFound";
import PaginationBar from "../components/PaginationBar";
import { useAuth } from "../context/AuthContext";
import { IGetUserMovieList } from "../abstract/interfaces";
import { getUserWatchListFB } from "../fetch/firebase";
import {
  ERR_RESPONSE_NOT_FOUND,
  ERR_USER_NOT_FOUND,
} from "../abstract/constants";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const MoviePage = () => {
  const { user } = useAuth();

  const {
    data,
    loading,
    error,
    page,
    mediaType,
    setMediaType,
    setPage,
    userTrackerList,
    handleGetUserWatchListAndReturn,
  } = useMovie();

  const [params, _] = useSearchParams();

  useEffect(() => {
    setMediaType("movie");
    if (page && page !== 1) setPage(page);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (user) {
      handleGetUserWatchListAndReturn();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          userTrackerList={userTrackerList}
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
