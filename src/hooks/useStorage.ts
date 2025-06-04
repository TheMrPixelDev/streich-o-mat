import { useSubjects } from "./useSubjects";

export const useStorage = () => {
  const { setSubjects, subjects } = useSubjects();

  const saveToLocalStorage = () => {
    localStorage.setItem("grades", JSON.stringify(subjects));
  };

  const loadFromLocalStorage = () => {
    const loadedSubjects = localStorage.getItem("grades");
    if (loadedSubjects !== null && loadedSubjects !== undefined) setSubjects(JSON.parse(loadedSubjects));
  };

  const deleteSubjcets = () => {
    localStorage.setItem("grades", JSON.stringify([]));
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    deleteSubjcets,
  };
};
