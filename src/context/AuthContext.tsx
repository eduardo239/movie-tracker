import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
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
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { handleError } from "../helper";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: IUserAuth) => void;
  register: (user: IUserAuth) => void;
  logout: () => void;
  getUser: () => void;

  user: null | User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [, setLocal] = useLocalStorage("user", "");

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
        toast("Usuário registrado com sucesso.");
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleError(error);
        setLocal("");
        setUser(null);
        setIsAuthenticated(false);
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
      if (error instanceof FirebaseError) {
        handleError(error);
        setLocal("");
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        setUser(null);
        setLocal("");
        navigate("/");
        toast.success("Usuário saiu com sucesso.");
      })
      .catch((error) => {
        handleError(error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    toast.error("useAuth must be used within an AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
