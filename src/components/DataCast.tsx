import { Button } from "semantic-ui-react";
import { ICast } from "../abstract/interfaces";
import GridContainer from "./Layout/GridContainer";
import PersonGroup from "./Person/PersonGroup";
import TitleInfo from "./Elements/TitleInfo";
import { useState } from "react";

type TDataCast = {
  data: { credits: { cast: ICast[] } };
};

const DataCast = ({ data }: TDataCast) => {
  const [length, setLength] = useState(5);

  const handleChangeLength = (_length: number) => {
    if (length + _length <= 4) {
      return;
    }
    setLength(length + _length);
  };

  if (data.credits.cast.length > 0)
    return (
      <>
        <TitleInfo center title="Elenco" />
        <GridContainer centered gap="gap-sm">
          <PersonGroup data={data} length={length} />
        </GridContainer>

        <div className="p-3">
          <Button.Group>
            <Button size="tiny" onClick={() => handleChangeLength(-5)}>
              Ver Menos
            </Button>
            <Button size="tiny" onClick={() => handleChangeLength(5)}>
              Ver Mais
            </Button>
          </Button.Group>
        </div>
      </>
    );
};

export default DataCast;
