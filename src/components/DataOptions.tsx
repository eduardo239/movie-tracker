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
    <div className="flex flex-center gap-sm ">
      <button
        className={`${
          listType === "see" ? "app-button__primary" : ""
        } app-button`}
        onClick={() => handleClick("see")}
      >
        <Icon name="add" /> Vou Ver
      </button>
      <button
        className={`${
          listType === "saw" ? "app-button__primary" : ""
        } app-button`}
        onClick={() => handleClick("saw")}
      >
        <Icon name="check" /> Já Vi
      </button>
      <button
        className={`${
          listType === "block" ? "app-button__primary" : ""
        } app-button`}
        onClick={() => handleClick("block")}
      >
        <Icon name="delete" /> Bloquear
      </button>
    </div>
  );
};

export default DataOptions;
