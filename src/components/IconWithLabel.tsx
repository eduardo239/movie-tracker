import { Icon, SemanticICONS } from "semantic-ui-react";

const IconWithLabel = ({
  iconName = "check",
  label = "Label",
}: {
  iconName: SemanticICONS;
  label: string;
}) => {
  return (
    <>
      <Icon name={iconName} /> {label}
    </>
  );
};

export default IconWithLabel;
