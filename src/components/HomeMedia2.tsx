import { useNavigate } from "react-router-dom";
import { Button, Icon, Segment } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";

const HomeMedia = () => {
  const navigate = useNavigate();
  const { page, setMediaType } = useMovie();

  const handleChangePage = (_page: string, _mediaType: "movie" | "tv") => {
    setMediaType(_mediaType);
    navigate(`/all?media=${_mediaType}&page=${_page}`);
  };

  if (page)
    return (
      <Segment basic textAlign="center">
        <Button
          icon
          labelPosition="left"
          onClick={() => handleChangePage(page, "movie")}
        >
          <Icon name="film" />
          Movie
        </Button>
        <Button
          icon
          labelPosition="left"
          onClick={() => handleChangePage(page, "tv")}
        >
          <Icon name="television" />
          TV
        </Button>
      </Segment>
    );
};

export default HomeMedia;
