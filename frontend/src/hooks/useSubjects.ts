import { useContext } from "react";
import { SubjectContext } from "../contexts";

export const useSubjects = () => {
  return useContext(SubjectContext);
};
