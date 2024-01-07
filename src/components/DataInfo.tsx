import { FlagNameValues } from "semantic-ui-react";
import { formatDate } from "../helper";
import TitleInfo from "./Elements/TitleInfo";

type TDataInfo = {
  data: {
    release_date: string;
    status: string;
    original_language?: string;
    origin_country?: string[];
    production_countries?: {
      iso_3166_1: FlagNameValues;
      name: string;
    }[];
  };
};

const DataInfo = ({ data }: TDataInfo) => {
  return (
    <div className="p-4 app-dark-theme">
      <TitleInfo center title="Informações" />
      {data.release_date && (
        <p>Data de Lançamento: {formatDate(data.release_date)}</p>
      )}
      <p>Status: {data.status}</p>
      {data.original_language && (
        <p>Língua Original: {data.original_language.toUpperCase()}</p>
      )}
    </div>
  );
};

export default DataInfo;
