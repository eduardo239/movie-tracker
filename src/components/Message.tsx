import { Segment, Message } from "semantic-ui-react";

const MessageInfo = ({ message }: { message: string }) => {
  return (
    <Message negative>
      <Message.Header>Error</Message.Header>
      <p>{message}</p>
    </Message>
  );
};

export default MessageInfo;
