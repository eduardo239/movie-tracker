import { Button, Form, Input, Select } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../fetch/tmdb";

const options = [
  { key: "movie", text: "Movie", value: "movie" },
  { key: "tv", text: "TV", value: "tv" },
];

const HomeSearch = () => {
  const { mediaType, setMediaType, setSearchResults } = useMovie();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      setSearchResults([]);
      navigate(`/all?media=${mediaType}&page=${page}`);
      return;
    }

    const data = await getSearch(mediaType, search, page);
    setSearchResults(data);
    setPage(1);
    navigate(`/search?page=${page}`);
  };

  return (
    <Form onSubmit={(e) => onSearchSubmit(e)}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fluid
        type="text"
        placeholder="Search..."
        action
      >
        <input />
        <Select
          onChange={() => setMediaType("tv")}
          compact
          options={options}
          defaultValue={mediaType}
        />
        <Button type="submit">Search</Button>
      </Input>
    </Form>
  );
};

export default HomeSearch;
