import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

type TNextPrevButtons = {
  onPageChange: (page: number) => void;
  page: number;
  next: number;
  prev: number;
};

export const NextPrevButtons = ({
  onPageChange,
  page,
  next,
  prev,
}: TNextPrevButtons) => {
  return (
    <Segment basic textAlign="center">
      <Button
        icon
        labelPosition="left"
        disabled={page === 1}
        onClick={() => onPageChange(prev)}
      >
        <Icon name="arrow left" />
        Previous
      </Button>
      <Button icon labelPosition="right" onClick={() => onPageChange(next)}>
        <Icon name="arrow right" />
        Next
      </Button>
    </Segment>
  );
};
