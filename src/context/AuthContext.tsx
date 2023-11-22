import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { IUserAuth } from "../abstract/interfaces";
import { app } from "../config/firebase";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: IUserAuth) => void;
  register: (user: IUserAuth) => void;
  logout: () => void;
  getUser: () => void;

  user: null | User;
  authMessage: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [authMessage, setAuthMessage] = useState("");
  const [, setLocal] = useLocalStorage("user", "");

  const handleMessage = (message: string) => {
    setAuthMessage(message);
    setTimeout(() => {
      setAuthMessage("");
    }, 2000);
  };

  const register = async (user: IUserAuth) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      ).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setLocal(JSON.stringify(user));
        setIsAuthenticated(true);
        navigate("/");
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        handleMessage(error.message);
        setLocal("");
        setUser(null);
        setIsAuthenticated(false);
        // navigate("/");
      }
    }
  };

  const login = async (user: IUserAuth) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password).then(
        (userCredential) => {
          const user = userCredential.user;
          setUser(user);
          setLocal(JSON.stringify(user));
          setIsAuthenticated(true);
          navigate("/");
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        handleMessage(error.message);
        setLocal("");
        setUser(null);
        setIsAuthenticated(false);
        // navigate("/");
      }
    }
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        handleMessage("Sign-out successful");
        setIsAuthenticated(false);
        setUser(null);
        setLocal("");
        navigate("/");
      })
      .catch((error) => {
        handleMessage(error.message);
        setLocal("");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/");
      });
  };

  const getUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
      const userLocalStorage = localStorage.getItem("user");
      if (userLocalStorage) {
        setUser(JSON.parse(userLocalStorage));
        setIsAuthenticated(true);
      }
    });
  };

  useEffect(() => {
    app;
    getUser();
    return () => {};
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        register,
        login,
        logout,
        getUser,
        user,
        authMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
