import { ERR_CAST_NOT_FOUND } from "../../abstract/constants";
import { ICast } from "../../abstract/interfaces";
import PersonProfile from "./PersonProfile";
import MessageNotFound from "../Info/MessageNotFound";

type TPersonGroup = { data: { credits: { cast: ICast[] } }; length?: number };

const PersonGroup = ({ data, length = 5 }: TPersonGroup) => {
  return data.credits && data.credits.cast.length > 0 ? (
    data.credits.cast
      .map((c) => <PersonProfile key={c.id} cast={c} />)
      .slice(0, length)
  ) : (
    <MessageNotFound message={ERR_CAST_NOT_FOUND} />
  );
};

export default PersonGroup;
