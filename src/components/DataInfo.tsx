import { formatDate } from "../helper";
import TitleInfo from "./TitleInfo";

type TDataInfo = {
  data: { release_date: string; status: string; original_language?: string };
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
        <p>Lingua Original: {data.original_language.toUpperCase()}</p>
      )}
    </div>
  );
};

export default DataInfo;
