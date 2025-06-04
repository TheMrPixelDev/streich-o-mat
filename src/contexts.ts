import { createContext } from "react";
import type { Subject } from "./utils/utils";

export const SubjectContext = createContext<{ subjects: Subject[]; setSubjects: (s: Subject[]) => void }>({
  subjects: [],
  setSubjects: () => void 0,
});
