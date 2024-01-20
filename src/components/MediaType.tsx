import { Button, Icon } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MediaType = () => {
  const { setMediaType, setPage, page, list, setList } = useMovie();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(min-width: 764px)" });

  const handleChangePage = (_mediaType: "movie" | "tv") => {
    setPage(page);
    setMediaType(_mediaType);
    navigate(`/${_mediaType}s?page=${page}`);
  };

  return (
    <div className="flex flex-center p-2">
      <Button.Group color="orange">
        <Button
          icon
          labelPosition="right"
          onClick={() => handleChangePage("movie")}
        >
          <Icon name="film" /> Filmes
        </Button>
        <Button
          icon
          labelPosition="left"
          onClick={() => handleChangePage("tv")}
        >
          <Icon name="television" />
          Séries
        </Button>
      </Button.Group>{" "}
      <Button.Group color="brown">
        <Button icon labelPosition="left" onClick={() => setList("now")}>
          <Icon name="play circle" />
          Agora
        </Button>
        <Button icon labelPosition="left" onClick={() => setList("trending")}>
          <Icon name="chart line" />
          Em Alta
        </Button>
        <Button icon labelPosition="left" onClick={() => setList("popular")}>
          <Icon name="favorite" />
          Popular
        </Button>
      </Button.Group>
    </div>
  );
};

export default MediaType;
