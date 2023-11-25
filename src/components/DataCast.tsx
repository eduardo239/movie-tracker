import { Card, Container, Divider, Header, Segment } from "semantic-ui-react";
import CastProfile from "./CastProfile";
import { ICast } from "../abstract/interfaces";

const DataCast = ({ data }: { data: { credits: { cast: ICast[] } } }) => {
  if (data.credits.cast.length > 0)
    return (
      <Segment basic>
        <Header as="h3" inverted>
          Elenco
        </Header>

        <Segment basic style={{ margin: 0 }}>
          {data.credits && (
            <Card.Group itemsPerRow={6} className="gap-md flex flex-center">
              {data.credits.cast
                .map((a) => <CastProfile key={a.id} cast={a} />)
                .slice(0, 5)}
            </Card.Group>
          )}
        </Segment>
      </Segment>
    );
};

export default DataCast;
