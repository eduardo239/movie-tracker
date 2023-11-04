import { IMovieDetails } from "../abstract/interfaces";

const MovieRating = ({ data }: { data: IMovieDetails | null }) => {
  if (data)
    return (
      <div className="flex flex-end  bg-3">
        <div className="center p-sm">
          <small>Rating</small>
          <span className="rounded-element">
            {data.vote_average.toFixed(2)}
          </span>
        </div>
        <div className="center p-sm">
          <small>Runtime</small>
          <span className="rounded-element">{data.runtime}</span>
        </div>
      </div>
    );
};

export default MovieRating;
