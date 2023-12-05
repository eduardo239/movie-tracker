import { Header, Segment } from "semantic-ui-react";
import TitleInfo from "./TitleInfo";

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
    <Segment basic inverted>
      <TitleInfo
        as="h1"
        title={`${data.title} (${data.release_date?.split("-")[0]})`}
      />

      <p>
        <span className="date">Original Name: {data.original_title}</span>
      </p>
      <p style={{ fontSize: "1.15rem" }}>{data.overview}</p>
    </Segment>
  );
};

export default DataDetails;
