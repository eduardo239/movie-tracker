import { DocumentData } from "firebase/firestore";
import { IMovieDetails } from "../abstract/interfaces";
import { getRandomNumberInRange } from "../helper";
import { Image, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

type TDataGroup = {
  data: IMovieDetails[];
  userTrackerList?: DocumentData[];
};

const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;

const DataGroup = ({ data, userTrackerList }: TDataGroup) => {
  return (
    data &&
    data.map((x) => {
      const seeChecked = userTrackerList?.some((u) => {
        const _see = u.listType === "see";
        const _checked = x.id === u.dataId;
        return _see && _checked;
      });

      const sawChecked = userTrackerList?.some((u) => {
        const _saw = u.listType === "saw";
        const _checked = x.id === u.dataId;
        return _saw && _checked;
      });

      const blockChecked = userTrackerList?.some((u) => {
        const _block = u.listType === "block";
        const _checked = x.id === u.dataId;
        return _block && _checked;
      });

      const id = getRandomNumberInRange(0, 999999);

      return (
        <div className="relative" key={x.id + id}>
          <Segment compact inverted>
            <Link
              to={`/${
                x.media_type ? x.media_type : "title" in x ? "movie" : "tv"
              }?id=${x.id}`}
            >
              <Image
                style={{ maxWidth: " 13.125rem" }}
                fluid
                label={{
                  as: "label",
                  ribbon: "right",
                  color: seeChecked
                    ? "orange"
                    : sawChecked
                    ? "green"
                    : blockChecked
                    ? "grey"
                    : "black",
                  content: seeChecked
                    ? "Vou Ver"
                    : sawChecked
                    ? "Já Vi"
                    : blockChecked
                    ? "Não quer ver"
                    : "",
                  icon: seeChecked
                    ? "list"
                    : sawChecked
                    ? "eye"
                    : blockChecked
                    ? "trash"
                    : "star outline",
                }}
                src={
                  x.poster_path
                    ? tmdbPosterUrl + x.poster_path
                    : fbPosterDefault
                }
              />
            </Link>
          </Segment>
        </div>
      );
    })
  );
};

export default DataGroup;
