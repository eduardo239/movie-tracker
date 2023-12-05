import { Header, Segment } from "semantic-ui-react";
import { formatDate } from "../helper";
import TitleInfo from "./TitleInfo";

type TDataInfo = {
  data: { release_date: string; status: string; original_language?: string };
};

const DataInfo = ({ data }: TDataInfo) => {
  return (
    <>
      <TitleInfo title="Informações" />
      {data.release_date && (
        <p>Data de Lançamento: {formatDate(data.release_date)}</p>
      )}
      <p>Status: {data.status}</p>

      {data.original_language && (
        <p>Lingua Original: {data.original_language.toUpperCase()}</p>
      )}
    </>
  );
};

export default DataInfo;
