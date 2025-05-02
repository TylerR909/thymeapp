import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { database } from "./index.native";
import type { ReactNode } from "react";

export const DbProvider = ({ children }: { children: ReactNode }) => {
  return <DatabaseProvider database={database}>{children}</DatabaseProvider>;
};
