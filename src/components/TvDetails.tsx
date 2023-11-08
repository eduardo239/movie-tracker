import { Header, Segment } from "semantic-ui-react";
import { ITvDetails } from "../abstract/interfaces";

const TvDetails = ({ data }: { data: ITvDetails }) => {
  return (
    <Segment basic>
      <Header as="h1">
        {data.original_name} ({data.first_air_date.split("-")[0]}){" "}
      </Header>
      <p>{data.overview}</p>
    </Segment>
  );
};

export default TvDetails;
