import { Header, Segment } from "semantic-ui-react";
import { formatDate } from "../helper";

const DataInfo = ({
  data,
}: {
  data: { release_date: string; status: string; original_language?: string };
}) => {
  return (
    <Segment basic>
      <Header as="h2">Info</Header>
      <p>Release Date: {formatDate(data.release_date)}</p>
      <p>Status: {data.status}</p>

      {data.original_language && (
        <p>Original Language: {data.original_language.toUpperCase()}</p>
      )}
    </Segment>
  );
};

export default DataInfo;
