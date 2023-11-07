import { ITvDetails } from "../abstract/interfaces";

const RoundedStatus = ({ label, value }: { label: string; value: number }) => {
  return (
    <div>
      <p>
        <small>{label}</small>
      </p>

      <span>{value}</span>
    </div>
  );
};

export default RoundedStatus;
