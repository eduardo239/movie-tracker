import { Button, Icon, Segment } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";

const MediaType = () => {
  const { page, setMediaType } = useMovie();

  const handleChangePage = (_page: string, _mediaType: "movie" | "tv") => {
    setMediaType(_mediaType);
  };

  if (page)
    return (
      <Segment basic textAlign="center">
        <Button
          icon
          color="instagram"
          labelPosition="left"
          onClick={() => handleChangePage(page, "movie")}
        >
          <Icon name="film" />
          Movie
        </Button>
        <Button
          icon
          color="instagram"
          labelPosition="right"
          onClick={() => handleChangePage(page, "tv")}
        >
          <Icon name="television" />
          TV
        </Button>
      </Segment>
    );
};

export default MediaType;
