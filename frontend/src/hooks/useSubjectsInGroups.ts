import { useSubjects } from "./useSubjects";

export const useSubjectsInGroup = (group: string) => {
  const { subjects } = useSubjects();
  return subjects.filter((subject) => subject.group === group);
};
