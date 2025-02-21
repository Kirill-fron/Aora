import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite";

interface GlobalContextType {
  isLoadingIn: boolean;
  setIsLoadingIn: (value: boolean) => void;
  user: Models.Document | null;
  setUser: (user: Models.Document | null) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoadingIn: false,
  setIsLoadingIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  isLoggedIn: false
});

export const useGlobalContext = () => useContext(GlobalContext);

interface Props {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const [isLoadingIn, setIsLoadingIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoading(true);
          setUser(res);
        } else {
          setIsLoadingIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider 
      value={{
        isLoadingIn,
        setIsLoadingIn,
        user,
        setUser,
        isLoading,
        isLoggedIn: !!user
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;