import { ITvDetails } from "../abstract/interfaces";

const MovieRating = ({ data }: { data: ITvDetails }) => {
  return (
    <div className="flex flex-end  bg-3">
      <div className="center p-sm">
        <small>Rating</small>
        <span className="rounded-element">{data.vote_average.toFixed(2)}</span>
      </div>
      <div className="center p-sm">
        <small>Episodes</small>
        <span className="rounded-element">{data.number_of_episodes}</span>
      </div>
      <div className="center p-sm">
        <small>Seasons</small>
        <span className="rounded-element">{data.number_of_seasons}</span>
      </div>
    </div>
  );
};

export default MovieRating;
