import { useState } from "react";
import { ITvDetails } from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Header, Segment } from "semantic-ui-react";

interface IEpisode {
  season_number: number;
  episodes: number[];
}

interface ITracker {
  data: IEpisode[];
}

const tracker_ = {
  data: [],
};

const TvEpisodes = ({ data }: { data: ITvDetails }) => {
  const { user } = useAuth();

  const [tvTracker, setTvTracker] = useState<ITracker>(tracker_);

  function addItemToArrayIfNotExists(season: number, episode: number) {
    // console.log(season, episode);
    const _sExists = tvTracker.data.some((x) => x.season_number === season);

    // check if season exists

    if (!_sExists) {
      const data_ = tvTracker;
      const content_ = {
        season_number: season,
        episodes: [episode],
      };

      // added new data
      data_.data.push(content_);

      setTvTracker(data_);
    } else {
      const data_ = tvTracker;
      const index = data_.data.findIndex((o) => {
        return o.season_number === season;
      });

      // add/remove episode
      const _eExists = data_.data[index].episodes.some((x) => x === episode);
      if (_eExists) {
        console.log("remove episode");
        const newArray = data_.data[index].episodes.filter(
          (x) => x !== episode
        );
        data_.data[index].episodes = newArray;
        setTvTracker(data_);
      } else {
        data_.data[index].episodes.push(episode);
        setTvTracker(data_);
      }
    }
  }
  console.log(tvTracker);
  return (
    <Segment basic>
      {data.seasons.map((season, indexSeason) => (
        <Segment key={indexSeason}>
          <Header as="h3">Season {indexSeason + 1}</Header>
          <div className="flex">
            {[...Array(season.episode_count).keys()].map((ep, indexEpisode) => (
              <Button
                className={`${
                  tvTracker && tvTracker.data && tvTracker.data[indexSeason]
                    ? tvTracker.data[indexSeason].episodes.some(
                        (x) => x === indexEpisode + 1
                      )
                      ? "x"
                      : ""
                    : "x"
                }`}
                key={indexEpisode}
                style={{ margin: 0 }}
                onClick={() =>
                  addItemToArrayIfNotExists(indexSeason + 1, indexEpisode + 1)
                }
              >
                EP {ep + 1 < 10 ? "0" + (ep + 1) : ep + 1}
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
