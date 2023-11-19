import { Table } from "semantic-ui-react";

const ListItemType = ({ listType }: { listType: "see" | "saw" | "block" }) => {
  return (
    <>
      <Table.Cell textAlign="center">{listType === "see" && "Ok"}</Table.Cell>
      <Table.Cell textAlign="center">{listType === "saw" && "Ok"}</Table.Cell>
      <Table.Cell textAlign="center">{listType === "block" && "Ok"}</Table.Cell>
    </>
  );
};

export default ListItemType;
