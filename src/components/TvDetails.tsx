import { ITvDetails } from "../abstract/interfaces";

const TvDetails = ({ data }: { data: ITvDetails }) => {
  return (
    <div className="">
      <h3>
        {data.original_name} ({data.first_air_date.split("-")[0]}){" "}
      </h3>
      <p>{data.overview}</p>
    </div>
  );
};

export default TvDetails;
