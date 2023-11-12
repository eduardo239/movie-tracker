import { Header, Segment } from "semantic-ui-react";

const DataDetails = ({
  data,
}: {
  data: {
    title?: string;
    overview: string;
    release_date?: string;
    original_title: string;
  };
}) => {
  return (
    <Segment basic>
      <Header as="h1">
        {data.title} ({data.release_date?.split("-")[0]}){" "}
      </Header>
      <p>
        <span className="date">Original Name: {data.original_title}</span>
      </p>

      <p style={{ fontSize: "1.15rem" }}>{data.overview}</p>
    </Segment>
  );
};

export default DataDetails;