import { useState } from "react";
import { ITrackerTv, ITvDetails } from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Grid } from "semantic-ui-react";

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
          <Grid>
            {[...Array(season.episode_count).keys()].map((ep, indexEpisode) => (
              <Grid.Column
                key={indexEpisode}
                mobile={4}
                tablet={3}
                largeScreen={2}
                computer={1}
                widescreen={3}
              >
                <Button
                  onClick={() =>
                    addItemToArrayIfNotExists(indexSeason + 1, indexEpisode + 1)
                  }
                >
                  EP {ep + 1}
                </Button>
              </Grid.Column>
            ))}
          </Grid>
          <br />
          <Button>All Episodes</Button>
        </div>
      ))}
    </section>
  );
};

export default TvEpisodes;
