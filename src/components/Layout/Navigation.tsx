import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Icon, Menu } from "semantic-ui-react";
import { useState } from "react";
import { IconBase } from "react-icons";
import { useMediaQuery } from "react-responsive";

const Navigation = () => {
  const { logout, user } = useAuth();

  const isSmallScreen = useMediaQuery({ query: "(min-width: 764px)" });

  const navigate = useNavigate();

  const [activeItem, _] = useState("");

  const handleItemClick = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <Menu>
      <Menu.Item
        icon={!isSmallScreen}
        name="home"
        active={activeItem === "home"}
        value="home"
        onClick={() => handleItemClick("/")}
      >
        <Icon name="home" /> {isSmallScreen && "Home"}
      </Menu.Item>

      {user && (
        <Menu.Item
          icon={!isSmallScreen}
          name="tracker"
          active={activeItem === "tracker"}
          onClick={() => handleItemClick("/tracker?type=movie")}
        >
          <Icon name="save" /> {isSmallScreen && "Tracker"}
        </Menu.Item>
      )}

      {user && (
        <Menu.Item
          icon={!isSmallScreen}
          name="lists"
          active={activeItem === "lists"}
          onClick={() => handleItemClick("/lists")}
        >
          <Icon name="list" /> {isSmallScreen && "Minhas Listas"}
        </Menu.Item>
      )}

      <Menu.Item
        icon={!isSmallScreen}
        name="all-lists"
        active={activeItem === "all-lists"}
        onClick={() => handleItemClick("/all-lists")}
      >
        <Icon name="list ol" /> {isSmallScreen && "Todas as Listas "}
      </Menu.Item>

      {!user && (
        <Menu.Item
          icon={!isSmallScreen}
          name="sing-in"
          active={activeItem === "sing-in"}
          onClick={() => handleItemClick("/sign-in")}
          disabled={!!user}
        >
          <Icon name="sign-in" /> {isSmallScreen && "Entrar"}
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item
          icon={!isSmallScreen}
          name="sign-up"
          active={activeItem === "sign-up"}
          onClick={() => handleItemClick("/sign-up")}
          disabled={!!user}
        >
          <Icon name="address book outline" /> {isSmallScreen && "Registrar"}
        </Menu.Item>
      )}

      {user && (
        <Menu.Item
          icon={!isSmallScreen}
          position="right"
          name="user-email"
          disabled={true}
        >
          <Icon name="user outline" />{" "}
          {isSmallScreen && user.email?.slice(0, 5) + "..."}
        </Menu.Item>
      )}
      {user && (
        <Menu.Item
          icon={!isSmallScreen}
          name="logout"
          active={activeItem === "logout"}
          onClick={logout}
          disabled={!user}
        >
          <Icon name="log out" /> {isSmallScreen && "Sair"}
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navigation;
