import { useSubjects } from "./useSubjects";

export const useGroups = () => {
  const { subjects } = useSubjects();
  return new Array(...new Set(subjects.map((entry) => entry.group)));
};
