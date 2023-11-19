import { Pagination } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

const PaginationComponent = () => {
  const navigate = useNavigate();
  const { setPage, page } = useMovie();

  return (
    <Pagination
      pointing
      secondary
      siblingRange={3}
      activePage={page ? page : "1"}
      totalPages={100}
      onPageChange={(e, x) => {
        if (x.activePage) {
          setPage(x.activePage ? +x.activePage : 1);
          navigate(`/movies?page=${x.activePage}`);
        } else {
          setPage(1);
        }
      }}
    />
  );
};

export default PaginationComponent;
