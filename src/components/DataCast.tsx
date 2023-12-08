import { Header } from "semantic-ui-react";
import { ICast } from "../abstract/interfaces";
import GridContainer from "./GridContainer";
import PersonGroup from "./PersonGroup";
import TitleInfo from "./TitleInfo";

type TDataCast = {
  data: { credits: { cast: ICast[] } };
};

const DataCast = ({ data }: TDataCast) => {
  if (data.credits.cast.length > 0)
    return (
      <>
        <TitleInfo center title="Elenco" />
        <GridContainer centered gap="gap-sm">
          <PersonGroup data={data} />
        </GridContainer>
      </>
    );
};

export default DataCast;
