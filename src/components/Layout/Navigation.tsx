import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu } from "semantic-ui-react";
import { useState } from "react";

const Navigation = () => {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const [activeItem, _] = useState("");

  const handleItemClick = (path: string) => {
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

      {user && (
        <Menu.Item
          name="tracker"
          active={activeItem === "tracker"}
          onClick={() => handleItemClick("/tracker?type=movie")}
        >
          Tracker
        </Menu.Item>
      )}

      {user && (
        <Menu.Item
          name="lists"
          active={activeItem === "lists"}
          onClick={() => handleItemClick("/lists")}
        >
          Listas
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item
          name="sing-in"
          active={activeItem === "sing-in"}
          onClick={() => handleItemClick("/sign-in")}
          disabled={!!user}
        >
          Entrar
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item
          name="sign-up"
          active={activeItem === "sign-up"}
          onClick={() => handleItemClick("/sign-up")}
          disabled={!!user}
        >
          Registrar
        </Menu.Item>
      )}

      {user && (
        <Menu.Item position="right" name="user-email" disabled={true}>
          {user.email?.slice(0, 10) + "..."}
        </Menu.Item>
      )}
      {user && (
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={logout}
          disabled={!user}
        >
          Sair
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navigation;
