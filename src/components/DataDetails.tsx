import TitleInfo from "./Elements/TitleInfo";

type TDataDetails = {
  data: {
    title?: string;
    overview: string;
    release_date?: string;
    original_title: string;
  };
};

const DataDetails = ({ data }: TDataDetails) => {
  return (
    <div className="p-4 app-dark-theme">
      <TitleInfo
        as="h1"
        title={`${data.title} (${data.release_date?.split("-")[0]})`}
      />

      <p>
        <span className="opacity-6">Original Name: {data.original_title}</span>
      </p>
      <p className="font-size-1-15">{data.overview}</p>
    </div>
  );
};

export default DataDetails;
