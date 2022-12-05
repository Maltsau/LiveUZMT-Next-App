import { useContext, useState, useMemo, createContext, ReactNode } from "react";

const UserContextObject = createContext<{
  user?: string;
  setUser: (user: string) => void;
}>({
  setUser: () => {},
});

export function useUserContext() {
  return useContext(UserContextObject);
}

const UserContextProvider: React.FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  const [user, setUser] = useState<string>("");
  const values = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContextObject.Provider value={values}>
      {children}
    </UserContextObject.Provider>
  );
};

export default UserContextProvider;
