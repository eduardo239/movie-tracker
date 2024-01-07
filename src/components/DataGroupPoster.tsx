import { Image } from "semantic-ui-react";

const DataGroupPoster = ({
  checked,
  src,
}: {
  checked: {
    seeChecked?: boolean;
    sawChecked?: boolean;
    blockChecked?: boolean;
  };
  src: string;
}) => {
  const listTypeCheckColor = () => {
    return checked.seeChecked
      ? "orange"
      : checked.sawChecked
      ? "green"
      : checked.blockChecked
      ? "grey"
      : "black";
  };

  const listTypeCheckType = () => {
    return checked.seeChecked
      ? "Vou Ver"
      : checked.sawChecked
      ? "Já Vi"
      : checked.blockChecked
      ? "Não quer ver"
      : "";
  };

  const listTypeCheckIcon = () => {
    return checked.seeChecked
      ? "list"
      : checked.sawChecked
      ? "eye"
      : checked.blockChecked
      ? "trash"
      : "star outline";
  };

  return (
    <Image
      style={{ maxWidth: " 13.125rem" }}
      fluid
      label={{
        as: "label",
        ribbon: "right",
        color: listTypeCheckColor(),
        content: listTypeCheckType(),
        icon: listTypeCheckIcon(),
      }}
      src={src}
    />
  );
};

export default DataGroupPoster;
