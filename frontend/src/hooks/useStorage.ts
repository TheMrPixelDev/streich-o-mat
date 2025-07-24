import type { Subject } from "../utils/utils";
import { useSubjects } from "./useSubjects";

export const useStorage = () => {
  const { setSubjects, subjects } = useSubjects();

  const resetData = () => {
    setSubjects([]);
  };

  const exportToFile = () => {
    const blob = new Blob([JSON.stringify(subjects)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `noten-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = () => {
      const file = input.files?.[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = JSON.parse(reader.result as string) as Subject[];
        setSubjects(result);
      };

      if (file !== undefined) {
        reader.readAsText(file);
      }
    };

    input.click();
  };

  return {
    resetData,
    exportToFile,
    importFromFile,
  };
};
