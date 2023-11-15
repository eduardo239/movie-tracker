import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu } from "semantic-ui-react";
import { useState } from "react";
import { useMovie } from "../context/MovieContext";

const Navigation = () => {
  const { setSearchResults } = useMovie();
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (path: string) => {
    setSearchResults([]);
    navigate(`${path}`);
  };

  return (
    <Menu>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        value="home"
        onClick={() => handleItemClick("/")}
      >
        Home
      </Menu.Item>

      <Menu.Item
        name="movie"
        active={activeItem === "movie"}
        value="movie"
        onClick={() => handleItemClick("/movies?page=1")}
      >
        Filmes
      </Menu.Item>

      <Menu.Item
        name="tv"
        active={activeItem === "tv"}
        value="tv"
        onClick={() => handleItemClick("/tvs?page=1")}
      >
        Séries
      </Menu.Item>

      <Menu.Item
        name="lists"
        active={activeItem === "lists"}
        onClick={() => handleItemClick("/list")}
      >
        Listas
      </Menu.Item>

      <Menu.Item
        name="sing-in"
        active={activeItem === "sing-in"}
        onClick={() => handleItemClick("/sign-in")}
        disabled={!!user}
      >
        Entrar
      </Menu.Item>

      <Menu.Item
        name="sign-up"
        active={activeItem === "sign-up"}
        onClick={() => handleItemClick("/sign-up")}
        disabled={!!user}
      >
        Registrar
      </Menu.Item>

      <Menu.Item
        name="logout"
        active={activeItem === "logout"}
        onClick={logout}
        disabled={!user}
      >
        Sair
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
