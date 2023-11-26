import { ICast } from "../abstract/interfaces";
import CastProfile from "./CastProfile";

const PersonGroup = ({ data }: { data: { credits: { cast: ICast[] } } }) => {
  return (
    data.credits &&
    data.credits.cast
      .map((a) => <CastProfile key={a.id} cast={a} />)
      .slice(0, 5)
  );
};

export default PersonGroup;
