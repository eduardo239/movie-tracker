import { Pagination, Segment } from "semantic-ui-react";

const PaginationC = ({
  onPageChange,
}: {
  onPageChange: (_page: string | number | undefined) => Promise<void>;
}) => {
  return (
    <Segment basic textAlign="center">
      <Pagination
        boundaryRange={1}
        defaultActivePage={1}
        ellipsisItem={"..."}
        siblingRange={1}
        firstItem={{
          "aria-label": "First item",
          content: "«",
        }}
        pointing
        secondary
        totalPages={500}
        onPageChange={(e, d) => {
          if (d.activePage) {
            onPageChange(d.activePage);
          }
        }}
      />
    </Segment>
  );
};

export default PaginationC;
