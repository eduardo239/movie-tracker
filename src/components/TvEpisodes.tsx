import { useState } from "react";
import { ITrackerTv, ITvDetails } from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";

const TvEpisodes = ({ data }: { data: ITvDetails }) => {
  const { user } = useAuth();

  const [tvTracker, setTvTracker] = useState<[]>([]);

  function addItemToArrayIfNotExists(season: number, episode: number) {
    console.log(season, episode);

    const t = {
      data: {
        seasons: [
          {
            season: season,
            episodes: [episode],
          },
        ],
      },
    };

    // const a = seasons.filter((e) => e.episode_number !== episode);
    return true;
  }

  // const _ep = { episode_number: ep.episode_number, watched: ep.watched };
  // const _se = [_ep];
  // const _tr = { data: [{ episodes: _se, season_number: 1 }] };

  return (
    <section>
      {data.seasons.map((season, indexSeason) => (
        <div key={indexSeason}>
          <h5>Season {indexSeason + 1}</h5>
          <div>
            {[...Array(season.episode_count).keys()].map((ep, indexEpisode) => (
              <button
                key={indexEpisode}
                onClick={() =>
                  addItemToArrayIfNotExists(indexSeason + 1, indexEpisode + 1)
                }
              >
                EP {ep + 1}
              </button>
            ))}
            <button>All Episodes</button>
          </div>
          <br />
        </div>
      ))}
    </section>
  );
};

export default TvEpisodes;
