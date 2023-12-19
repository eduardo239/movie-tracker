import { useEffect, useState } from "react";
import { ITvDetails } from "../abstract/interfaces";
import { Button, Segment } from "semantic-ui-react";
import { createArrayOfArrays } from "../helper";
import TitleInfo from "./Elements/TitleInfo";

/*
season starts with 0
episodes starts with 1
*/

interface ITracker {
  data: number[][];
}

const _trackerDefault: ITracker = {
  data: [],
};

type TTvEpisodes = { data: ITvDetails };

const TvEpisodes = ({ data }: TTvEpisodes) => {
  const [tvTracker, setTvTracker] = useState<ITracker>(_trackerDefault);

  // TODO:
  function addItemToArrayIfNotExists(season: number, episode: number) {
    const exists = tvTracker.data[season].some((x) => x === episode);

    if (!exists) {
      tvTracker.data[season].push(episode);
      tvTracker.data[season].sort();
    } else {
      const _newArray = tvTracker.data[season].filter((x) => x !== episode);
      tvTracker.data[season] = _newArray;
    }
  }

  useEffect(() => {
    const _arrays = createArrayOfArrays(data.number_of_seasons);
    const _data: ITracker = {
      data: _arrays,
    };

    setTvTracker(_data);
  }, [data]);

  return (
    <Segment basic>
      {data.seasons.map((season, indexSeason) => (
        <Segment key={indexSeason}>
          <TitleInfo title={`Temporada ${indexSeason + 1}`} />

          <div className="flex flex-center">
            {[...Array(season.episode_count).keys()].map((ep, indexEpisode) => (
              <Button
                color={
                  tvTracker?.data[indexSeason]?.some((x) => {
                    return x === indexEpisode + 1;
                  })
                    ? "orange"
                    : undefined
                }
                key={indexEpisode}
                style={{ margin: 0 }}
                onClick={() =>
                  addItemToArrayIfNotExists(indexSeason, indexEpisode + 1)
                }
              >
                EP {ep + 1 < 10 ? "0" + (ep + 1) : ep + 1}
              </Button>
            ))}
          </div>
          <br />
          <Button fluid>Completar Todos Episódios</Button>
        </Segment>
      ))}
    </Segment>
  );
};

export default TvEpisodes;
