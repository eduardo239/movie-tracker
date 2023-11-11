import { Card, Divider, Header, Segment } from "semantic-ui-react";
import CastProfile from "./CastProfile";
import { ICast } from "../abstract/interfaces";

const DataCast = ({ data }: { data: { credits: { cast: ICast[] } } }) => {
  return (
    <Segment basic>
      <Divider />
      <Header as="h2">Cast</Header>
      {data.credits && (
        <Card.Group doubling itemsPerRow={7} centered>
          {data.credits.cast
            .map((a) => <CastProfile key={a.id} cast={a} />)
            .slice(0, 7)}
        </Card.Group>
      )}
    </Segment>
  );
};

export default DataCast;
