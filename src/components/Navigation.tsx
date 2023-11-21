import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu } from "semantic-ui-react";
import { useState } from "react";

const Navigation = () => {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const [activeItem, _] = useState("");

  const handleItemClick = (path: string) => {
    navigate(`${path}`);
  };

  const url = "https://api.themoviedb.org/3/movie/latest";

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
        name="home"
        active={activeItem === "latest"}
        value="home"
        onClick={() => handleItemClick("/")}
      >
        Home
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
