import { Pagination } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

const PaginationComponent = () => {
  const navigate = useNavigate();
  const { setPage, page, mediaType } = useMovie();

  return (
    <div className="flex flex-center">
      <Pagination
        firstItem={null}
        lastItem={null}
        boundaryRange={1}
        inverted
        siblingRange={1}
        activePage={page ? page : "1"}
        totalPages={99}
        onPageChange={(e, x) => {
          if (x.activePage) {
            setPage(x.activePage ? +x.activePage : 1);
            navigate(`/${mediaType}s?page=${x.activePage}`);
          } else {
            setPage(1);
          }
        }}
      />
    </div>
  );
};

export default PaginationComponent;
