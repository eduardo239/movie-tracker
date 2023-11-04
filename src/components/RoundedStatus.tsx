import { ITvDetails } from "../abstract/interfaces";

const RoundedStatus = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="center">
      <p>
        <small>{label}</small>
      </p>

      <span
        className={`rounded-element ${
          label === "Rating" && value > 7
            ? "rounded-element__green"
            : label === "Rating" && value > 5
            ? "rounded-element__yellow"
            : label === "Rating" && "rounded-element__red"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default RoundedStatus;
