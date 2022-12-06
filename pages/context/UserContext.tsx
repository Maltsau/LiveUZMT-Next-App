import { useContext, useState, useMemo, createContext, ReactNode } from "react";

type UserType = { userName?: string; role?: string };

const UserContextObject = createContext<{
  user?: UserType;
  setUser: (user: UserType) => void;
}>({
  setUser: () => {},
});

export function useUserContext() {
  return useContext(UserContextObject);
}

const UserContextProvider: React.FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>({});
  const values = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContextObject.Provider value={values}>
      {children}
    </UserContextObject.Provider>
  );
};

export default UserContextProvider;
