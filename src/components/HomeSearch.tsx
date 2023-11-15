import React, { useState } from "react";
import { Button, Form, Input, Select } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";

const HomeSearch = () => {
  const { setMediaType, mediaType, search, setSearch } = useMovie();

  const _options = [
    { key: "movie", text: "Movie", value: "movie" },
    { key: "tv", text: "TV", value: "tv" },
  ];
  const [options, _] = useState(_options);

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  const handleMediaTypeChange = () => {
    if (mediaType === "tv") setMediaType("movie");
    else setMediaType("tv");
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
        <input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Select
          onChange={handleMediaTypeChange}
          compact
          options={options}
          defaultValue="movie"
        />
        <Button type="submit">Search</Button>
      </Input>
    </Form>
  );
};

export default HomeSearch;
/*

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

    if (mediaType) {
      const data = await getSearch(mediaType, search, page);
      setSearchResults(data);
      setPage(1);
      navigate(`/search?page=${page}`);
    }
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
          defaultValue={mediaType ? mediaType : "movie"}
        />
        <Button type="submit">Search</Button>
      </Input>
    </Form>
  );
};

export default HomeSearch;
*/
