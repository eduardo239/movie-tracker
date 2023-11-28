import { Header } from "semantic-ui-react";
import { ICast } from "../abstract/interfaces";
import GridContainer from "./GridContainer";
import PersonGroup from "./PersonGroup";

const DataCast = ({ data }: { data: { credits: { cast: ICast[] } } }) => {
  if (data.credits.cast.length > 0)
    return (
      <>
        <Header as="h3" inverted>
          Elenco
        </Header>

        <GridContainer centered gap="gap-sm">
          <PersonGroup data={data} />
        </GridContainer>
      </>
    );
};

export default DataCast;
