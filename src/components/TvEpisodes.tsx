import { useState } from "react";
import { ITrackerTv, ITvDetails } from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Grid, Header, Segment } from "semantic-ui-react";

const TvEpisodes = ({ data }: { data: ITvDetails }) => {
  const { user } = useAuth();

  const [tvTracker, setTvTracker] = useState<[]>([]);

  function addItemToArrayIfNotExists(season: number, episode: number) {
    console.log(season, episode);

    // check if season exists

    // // if not exists add new season and ep

    // // if exists update ep

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

    console.log(t);

    // const a = seasons.filter((e) => e.episode_number !== episode);
    return true;
  }

  // const _ep = { episode_number: ep.episode_number, watched: ep.watched };
  // const _se = [_ep];
  // const _tr = { data: [{ episodes: _se, season_number: 1 }] };

  return (
    <Segment basic>
      {data.seasons.map((season, indexSeason) => (
        <Segment key={indexSeason}>
          <Header as="h3">Season {indexSeason + 1}</Header>
          <div className="flex">
            {[...Array(season.episode_count).keys()].map((ep, indexEpisode) => (
              <Button
                key={indexEpisode}
                style={{ margin: 0 }}
                onClick={() =>
                  addItemToArrayIfNotExists(indexSeason + 1, indexEpisode + 1)
                }
              >
                EP {ep + 1}
              </Button>
            ))}
          </div>
          <br />
          <Button fluid>Complete All Episodes</Button>
        </Segment>
      ))}
    </Segment>
  );
};

export default TvEpisodes;
