import { ICast } from "../abstract/interfaces";
import CastProfile from "./CastProfile";
import MessageNotFound from "./Info/MessageNotFound";

type TPersonGroup = { data: { credits: { cast: ICast[] } }; length?: number };

const PersonGroup = ({ data, length = 5 }: TPersonGroup) => {
  return data.credits && data.credits.cast.length > 0 ? (
    data.credits.cast
      .map((a) => <CastProfile key={a.id} cast={a} />)
      .slice(0, length)
  ) : (
    <MessageNotFound message="Elenco não encontrado" />
  );
};

export default PersonGroup;
