import React, { useState } from "react";
import { Button, Dropdown, Form, Icon, Input, Select } from "semantic-ui-react";
import { useMovie } from "../../context/MovieContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useMediaQuery } from "react-responsive";

const SearchBar = () => {
  const {
    setMediaType,
    setPage,
    setTerm,
    mediaType,
    setIsSearching,
    setLang,
    adult,
    setAdult,
  } = useMovie();

  const _options = [
    { key: "movie", text: "Filmes", value: "movie" },
    { key: "tv", text: "Séries", value: "tv" },
  ];
  const [options, _] = useState(_options);
  const [query, setQuery] = useState("");
  const [, setLocalLang] = useLocalStorage("lang", "pt");

  const isSmallScreen = useMediaQuery({ query: "(min-width: 764px)" });

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

  const countryOptions = [
    { key: "br", value: "pt", flag: "br", text: "Português" },
    { key: "us", value: "en", flag: "us", text: "Inglês" },
    { key: "es", value: "es", flag: "es", text: "Espanhol" },
  ];
  const countryOptionsMobile = [
    { key: "br", value: "pt", flag: "br", text: "" },
    { key: "us", value: "en", flag: "us", text: "" },
    { key: "es", value: "es", flag: "es", text: "" },
  ];
  const handleLangChange = (lang: string) => {
    setLocalLang(lang);
    setLang(lang);
  };

  const handleAdultChange = (adult: boolean) => {
    setAdult(adult);
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
        <Button
          icon={!isSmallScreen}
          type="submit"
          color={query.length > 0 ? "green" : "grey"}
        >
          <Icon name="search" /> {isSmallScreen && "Buscar"}
        </Button>

        <Button icon={!isSmallScreen} onClick={resetSearch}>
          <Icon name="repeat" /> {isSmallScreen && "Redefinir"}
        </Button>

        <Dropdown
          compact={!isSmallScreen}
          placeholder="Língua"
          search
          selection
          onChange={(e, d) =>
            d && d.value ? handleLangChange(d.value?.toString()) : "pt"
          }
          options={isSmallScreen ? countryOptions : countryOptionsMobile}
        />

        <Button
          icon
          color={adult ? "green" : "grey"}
          onClick={() => handleAdultChange(!adult)}
        >
          <Icon name="user secret" />
        </Button>
      </Input>
    </Form>
  );
};

export default SearchBar;
