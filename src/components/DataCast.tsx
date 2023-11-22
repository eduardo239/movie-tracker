import { Card, Divider, Header, Segment } from "semantic-ui-react";
import CastProfile from "./CastProfile";
import { ICast } from "../abstract/interfaces";

const DataCast = ({ data }: { data: { credits: { cast: ICast[] } } }) => {
  if (data.credits.cast.length > 0)
    return (
      <Segment basic inverted>
        <Divider />
        <Header as="h3">Elenco</Header>
        {data.credits && (
          <Card.Group doubling itemsPerRow={6} centered>
            {data.credits.cast
              .map((a) => <CastProfile key={a.id} cast={a} />)
              .slice(0, 6)}
          </Card.Group>
        )}
      </Segment>
    );
};

export default DataCast;
