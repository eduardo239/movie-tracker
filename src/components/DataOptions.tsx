import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { TListType } from "../abstract/interfaces";

const DataOptions = ({
  listType,
  handleClick,
}: {
  listType: TListType;
  handleClick: (listType: TListType) => void;
}) => {
  return (
    <Button.Group fluid size="medium">
      <Button
        inverted
        icon
        color={listType === "see" ? "green" : "grey"}
        basic={listType === "see" ? false : true}
        onClick={() => handleClick("see")}
      >
        <Icon name="add" /> Vou Ver
      </Button>
      <Button
        inverted
        icon
        color={listType === "saw" ? "green" : "grey"}
        basic={listType === "saw" ? false : true}
        onClick={() => handleClick("saw")}
      >
        <Icon name="check" /> Já Vi
      </Button>
      <Button
        inverted
        icon
        color={listType === "block" ? "green" : "grey"}
        basic={listType === "block" ? false : true}
        onClick={() => handleClick("block")}
      >
        <Icon name="delete" /> Bloquear
      </Button>
    </Button.Group>
  );
};

export default DataOptions;
