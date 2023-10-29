const Message = ({ authMessage }: { authMessage: string }) => {
  return <div className="message-container">{authMessage}</div>;
};

export default Message;
