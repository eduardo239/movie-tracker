import { useState } from "react";
import {
  IAddTvToList,
  ITrackerEpisodes,
  ITrackerSeasons,
  ITrackerTv,
  ITvDetails,
} from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";

const TvEpisodes = ({ data }: { data: ITvDetails }) => {
  const { user } = useAuth();

  const [tvTracker, setTvTracker] = useState<ITrackerTv | []>([]);
  const [episodes, setEpisodes] = useState<ITrackerEpisodes[]>([]);
  const [seasons, setSeasons] = useState([]);

  console.log(episodes);
  console.log(tvTracker);

  const handleSave = (ep: {
    season: number;
    number: number;
    watched: boolean;
  }) => {
    const _ep = { episode_number: ep.number, watched: ep.watched };
    const _ep2 = { episode_number: ep.number + 1, watched: false };
    const _se = [_ep, _ep2];
    const _tr = { data: [{ episodes: _se, season_number: 1 }] };

    setTvTracker(_tr);

    if (user) {
      if (tvTracker) {
        //const content: IAddTvToList = {};
        // addTvToList(content);
        // getUserMovieTracker(movie.id + "", user.uid);
      } else {
        //TODO: movie id not found
      }
    } else {
      //TODO: user not found
    }
  };
  return (
    <div>
      {data.seasons.map((season, indexSeason) => (
        <div key={indexSeason}>
          <h5 className="bg-1">Season {indexSeason + 1}</h5>
          <div className="flex gap">
            {[...Array(season.episode_count).keys()].map((ep, indexEpisode) => (
              <button
                className="btn-sm"
                key={indexEpisode}
                onClick={() =>
                  handleSave({
                    season: indexSeason + 1,
                    number: ep + 1,
                    watched: true,
                  })
                }
              >
                EP {ep + 1}
              </button>
            ))}
            <button className="btn-sm">All Episodes</button>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default TvEpisodes;
