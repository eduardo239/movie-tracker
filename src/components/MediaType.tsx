import { Button, Icon } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

const MediaType = () => {
  const { setMediaType, setPage, page } = useMovie();
  const navigate = useNavigate();

  const handleChangePage = (_mediaType: "movie" | "tv") => {
    setPage(page);
    setMediaType(_mediaType);
    navigate(`/${_mediaType}s?page=${page}`);
  };

  return (
    <div className="flex flex-center">
      <Button
        icon
        color="instagram"
        labelPosition="left"
        onClick={() => handleChangePage("movie")}
      >
        <Icon name="film" />
        Filmes
      </Button>
      <Button
        icon
        color="instagram"
        labelPosition="right"
        onClick={() => handleChangePage("tv")}
      >
        <Icon name="television" />
        Séries
      </Button>
    </div>
  );
};

export default MediaType;
