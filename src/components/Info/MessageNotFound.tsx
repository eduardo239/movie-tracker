import { Icon } from "semantic-ui-react";

type TMessageNotFound = { message: string };

const MessageNotFound = ({ message }: TMessageNotFound) => {
  return (
    <p className="flex flex-center">
      <Icon name="exclamation" /> {message}
    </p>
  );
};

export default MessageNotFound;
