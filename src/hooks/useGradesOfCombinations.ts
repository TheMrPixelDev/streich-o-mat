import type { CombinationWithGrade, Subject } from "../utils/utils";
import { useGroups } from "./useGroups";
import { useSubjects } from "./useSubjects";

export const useGradesOfCombinations = () => {
  const { subjects } = useSubjects();
  const groups = useGroups();

  const subjectsInGroup = (group: string) => subjects.filter((entry) => entry.group === group);

  const combinations = groups.reduce(
    (acc, group) =>
      acc.flatMap((tuple) =>
        [[], ...subjectsInGroup(group).map((subject) => [subject])].map((item) => [...tuple, ...item])
      ),
    [[]] as Array<Array<Subject>>
  );

  const gradesOfCombinations = combinations
    .map<CombinationWithGrade>((combination) => {
      const unstrikedSubjects = subjects.filter(
        (entry) => combination.find((comb) => comb.name === entry.name) === undefined
      );
      const weightedGradeSum = unstrikedSubjects.reduce((prev, curr) => prev + curr.ects * curr.grade, 0);
      const ectsSum = unstrikedSubjects.reduce((prev, curr) => prev + curr.ects, 0);

      return {
        totalGrade: weightedGradeSum / ectsSum,
        combination: combination,
      };
    })
    .sort((a, b) => a.totalGrade - b.totalGrade);

  return gradesOfCombinations;
};
