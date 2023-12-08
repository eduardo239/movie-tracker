import { useNavigate } from "react-router-dom";
import { Pagination } from "semantic-ui-react";

const PaginationBar = ({
  page,
  setPage,
  url,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  url: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-center p-2">
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
            navigate(url);
          } else {
            setPage(1);
          }
        }}
      />
    </div>
  );
};

export default PaginationBar;
