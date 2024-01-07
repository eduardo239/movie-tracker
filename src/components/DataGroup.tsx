import { DocumentData } from "firebase/firestore";
import { IMovieDetails } from "../abstract/interfaces";
import { getRandomNumberInRange } from "../helper";
import { Image, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DataGroupPoster from "./DataGroupPoster";

const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL2;

type TDataGroup = {
  data: IMovieDetails[];
  userTrackerList?: DocumentData[];
};

const DataGroup = ({ data, userTrackerList }: TDataGroup) => {
  return (
    data &&
    data.map((item) => {
      const title =
        "name" in item
          ? (item.name as string)
          : (item.original_title as string);

      const year2 =
        "first_air_date" in item
          ? (item.first_air_date as string)
          : (item.release_date as string);

      const year = parseInt(year2);

      const seeChecked = userTrackerList?.some((u) => {
        const _see = u.listType === "see";
        const _checked = item.id === u.dataId;
        return _see && _checked;
      });

      const sawChecked = userTrackerList?.some((u) => {
        const _saw = u.listType === "saw";
        const _checked = item.id === u.dataId;
        return _saw && _checked;
      });

      const blockChecked = userTrackerList?.some((u) => {
        const _block = u.listType === "block";
        const _checked = item.id === u.dataId;
        return _block && _checked;
      });

      const id = getRandomNumberInRange(0, 999999);

      const listTypeCheckColor = () => {
        return seeChecked
          ? "orange"
          : sawChecked
          ? "green"
          : blockChecked
          ? "grey"
          : "black";
      };

      const listTypeCheckType = () => {
        return seeChecked
          ? "Vou Ver"
          : sawChecked
          ? "Já Vi"
          : blockChecked
          ? "Não quer ver"
          : "";
      };

      const listTypeCheckIcon = () => {
        return seeChecked
          ? "list"
          : sawChecked
          ? "eye"
          : blockChecked
          ? "trash"
          : "star outline";
      };
      return (
        <div className="relative" key={item.id + id}>
          {item.poster_path ? (
            <Segment compact inverted>
              <Link
                to={`/${
                  item.media_type
                    ? item.media_type
                    : "title" in item
                    ? "movie"
                    : "tv"
                }?id=${item.id}`}
              >
                <DataGroupPoster
                  checked={{ seeChecked, sawChecked, blockChecked }}
                  src={tmdbPosterUrl + item.poster_path}
                />
              </Link>
            </Segment>
          ) : (
            <Segment compact inverted>
              <Link
                to={`/${
                  item.media_type
                    ? item.media_type
                    : "title" in item
                    ? "movie"
                    : "tv"
                }?id=${item.id}`}
              >
                <div className="relative">
                  <p className="poster-title__absolute">
                    {title} ({year})
                  </p>

                  <DataGroupPoster
                    checked={{ seeChecked, sawChecked, blockChecked }}
                    src={fbPosterDefault}
                  />
                </div>
              </Link>
            </Segment>
          )}
        </div>
      );
    })
  );
};

export default DataGroup;
