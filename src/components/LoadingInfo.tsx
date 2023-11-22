import { Dimmer, Loader } from "semantic-ui-react";

const LoadingInfo = () => {
  return (
    <Dimmer active>
      <Loader inverted />
    </Dimmer>
  );
};

export default LoadingInfo;
