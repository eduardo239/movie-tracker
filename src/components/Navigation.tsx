import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { logout } = useAuth();

  return (
    <nav className="navigation-container">
      <Link to="/">Home</Link>

      <Link to="/list">List</Link>

      <Link to="/sign-in">Sign In</Link>

      <Link to="/sign-up">Sign Up</Link>

      <Link to="/" onClick={logout}>
        Sign Out
      </Link>
    </nav>
  );
};

export default Navigation;
