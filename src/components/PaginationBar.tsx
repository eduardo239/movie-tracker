import { useEffect } from "react";
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

  useEffect(() => {
    navigate(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

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
            setPage(+x.activePage);
          }
        }}
      />
    </div>
  );
};

export default PaginationBar;
