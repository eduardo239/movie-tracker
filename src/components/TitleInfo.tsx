import { Header } from "semantic-ui-react";

const TitleInfo = ({
  title,
  as = "h3",
  center = false,
}: {
  title: string;
  as?: string;
  center?: boolean;
}) => {
  return (
    <Header inverted as={as} textAlign={center ? "center" : "left"}>
      {title}
    </Header>
  );
};

export default TitleInfo;
