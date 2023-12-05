import { Header } from "semantic-ui-react";

const TitleInfo = ({ title, as = "h3" }: { title: string; as?: string }) => {
  return (
    <Header as={as} inverted>
      {title}
    </Header>
  );
};

export default TitleInfo;
