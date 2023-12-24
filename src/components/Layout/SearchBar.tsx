import React, { useState } from "react";
import { Button, Form, Input, Select } from "semantic-ui-react";
import { useMovie } from "../../context/MovieContext";

const SearchBar = () => {
  const { setMediaType, setPage, setTerm, mediaType, setIsSearching } =
    useMovie();

  const _options = [
    { key: "movie", text: "Filmes", value: "movie" },
    { key: "tv", text: "Séries", value: "tv" },
  ];
  const [options, _] = useState(_options);
  const [query, setQuery] = useState("");

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query === "") {
      setIsSearching(false);
      return;
    } else {
      setPage(1);
      setTerm(query);
      setIsSearching(true);
    }
  };

  const resetSearch = () => {
    setIsSearching(false);
    setTerm("");
    setQuery("");
  };

  const handleMediaTypeChange = () => {
    if (mediaType === "tv") setMediaType("movie");
    else setMediaType("tv");
  };

  return (
    <Form onSubmit={onSearchSubmit}>
      <Input
        onChange={(e) => setQuery(e.target.value)}
        fluid
        type="text"
        placeholder="Buscar ..."
        action
      >
        <input value={query} />
        <Select
          onChange={handleMediaTypeChange}
          compact
          options={options}
          defaultValue={mediaType ? mediaType : "movie"}
        />
        <Button type="submit" color={query.length > 0 ? "green" : "grey"}>
          Buscar
        </Button>
        <Button onClick={resetSearch}>Redefinir</Button>
      </Input>
    </Form>
  );
};

export default SearchBar;
