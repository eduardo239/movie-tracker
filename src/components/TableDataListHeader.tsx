import React from "react";
import { Table } from "semantic-ui-react";

const TableDataListHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={2} textAlign="left">
          ID
        </Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell width={2} textAlign="center">
          Vou Ver
        </Table.HeaderCell>
        <Table.HeaderCell width={2} textAlign="center">
          Já Vi
        </Table.HeaderCell>
        <Table.HeaderCell width={2} textAlign="center">
          Bloqueado
        </Table.HeaderCell>
        {/* <Table.HeaderCell>Tipo</Table.HeaderCell> */}
        <Table.HeaderCell width={3} textAlign="center">
          Opções
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default TableDataListHeader;
