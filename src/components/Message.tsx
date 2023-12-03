import { Message } from "semantic-ui-react";

type TMessageInfo = { message: string };

const MessageInfo = ({ message }: TMessageInfo) => {
  return (
    <Message negative>
      <Message.Header>Error</Message.Header>
      <p>{message}</p>
    </Message>
  );
};

export default MessageInfo;
