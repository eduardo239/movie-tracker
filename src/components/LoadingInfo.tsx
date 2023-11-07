import { Dimmer, Loader, Segment } from "semantic-ui-react";

const LoadingInfo = () => {
  return (
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  );
};

export default LoadingInfo;
