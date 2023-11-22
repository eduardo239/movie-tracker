import { Header, Segment } from "semantic-ui-react";
import { formatDate } from "../helper";

const DataInfo = ({
  data,
}: {
  data: { release_date: string; status: string; original_language?: string };
}) => {
  return (
    <Segment basic inverted>
      <Header as="h3">Informações</Header>
      {data.release_date && (
        <p>Data de Lançamento: {formatDate(data.release_date)}</p>
      )}
      <p>Status: {data.status}</p>

      {data.original_language && (
        <p>Lingua Original: {data.original_language.toUpperCase()}</p>
      )}
    </Segment>
  );
};

export default DataInfo;
