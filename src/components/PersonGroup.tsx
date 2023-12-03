import { ICast } from "../abstract/interfaces";
import CastProfile from "./CastProfile";
import MessageNotFound from "./MessageNotFound";

type TPersonGroup = { data: { credits: { cast: ICast[] } } };

const PersonGroup = ({ data }: TPersonGroup) => {
  return data.credits && data.credits.cast.length > 0 ? (
    data.credits.cast
      .map((a) => <CastProfile key={a.id} cast={a} />)
      .slice(0, 5)
  ) : (
    <MessageNotFound message="Elenco não encontrado" />
  );
};

export default PersonGroup;
