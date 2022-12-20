import {
  useContext,
  useState,
  useMemo,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const EditModeContextObject = createContext<{
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}>({ isEditMode: false, setIsEditMode: () => {} });

export function useEditModeContext() {
  return useContext(EditModeContextObject);
}

const EditModeContextProvider: React.FC<{
  children?: ReactNode | undefined;
}> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const values = useMemo(
    () => ({ isEditMode, setIsEditMode }),
    [isEditMode, setIsEditMode]
  );
  return (
    <EditModeContextObject.Provider value={values}>
      {children}
    </EditModeContextObject.Provider>
  );
};

export default EditModeContextProvider;
