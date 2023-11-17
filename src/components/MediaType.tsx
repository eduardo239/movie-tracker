import { Button, Icon, Segment } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";

const MediaType = () => {
  const { setMediaType, setPage, page } = useMovie();

  const handleChangePage = (_mediaType: "movie" | "tv") => {
    setPage(page);
    setMediaType(_mediaType);
  };

  return (
    <Segment basic textAlign="center">
      <Button
        icon
        color="instagram"
        labelPosition="left"
        onClick={() => handleChangePage("movie")}
      >
        <Icon name="film" />
        Movie
      </Button>
      <Button
        icon
        color="instagram"
        labelPosition="right"
        onClick={() => handleChangePage("tv")}
      >
        <Icon name="television" />
        TV
      </Button>
    </Segment>
  );
};

export default MediaType;
