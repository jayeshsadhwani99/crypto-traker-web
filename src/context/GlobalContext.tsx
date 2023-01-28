import { createContext, PropsWithChildren } from "react";
export const GlobalContext = createContext<null>(null);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
  );
};
