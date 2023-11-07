import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu } from "semantic-ui-react";
import { useState } from "react";

const Navigation = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("");
  console.log(user);
  const handleItemClick = (path: string) => navigate(`${path}`);

  return (
    <Menu>
      <Menu.Item
        name="movie"
        active={activeItem === "movie"}
        value="movie"
        onClick={(e) => handleItemClick("/all?media=movie&page=1")}
      >
        Movies
      </Menu.Item>

      <Menu.Item
        name="tv"
        active={activeItem === "tv"}
        value="tv"
        onClick={(e) => handleItemClick("/all?media=tv&page=1")}
      >
        TV
      </Menu.Item>

      <Menu.Item
        name="lists"
        active={activeItem === "lists"}
        onClick={(e) => handleItemClick("/list")}
      >
        Lists
      </Menu.Item>

      <Menu.Item
        name="sing-in"
        active={activeItem === "sing-in"}
        onClick={(e) => handleItemClick("/sign-in")}
        disabled={!!user}
      >
        Sing In
      </Menu.Item>

      <Menu.Item
        name="sign-up"
        active={activeItem === "sign-up"}
        onClick={(e) => handleItemClick("/sign-up")}
        disabled={!!user}
      >
        Sing Up
      </Menu.Item>

      <Menu.Item
        name="logout"
        active={activeItem === "logout"}
        onClick={logout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
