import type { CombinationWithGrade, Subject } from "./utils";

addEventListener("message", (event: MessageEvent<{ chunk: Subject[][]; subjects: Subject[] }>) => {
  const { chunk, subjects } = event.data;
  const result = chunk.map<CombinationWithGrade>((combination) => {
    const unstrikedSubjects = subjects.filter(
      (entry) => combination.find((comb) => comb.name === entry.name) === undefined
    );
    const weightedGradeSum = unstrikedSubjects.reduce((prev, curr) => prev + curr.ects * curr.grade, 0);
    const ectsSum = unstrikedSubjects.reduce((prev, curr) => prev + curr.ects, 0);

    return {
      totalGrade: weightedGradeSum / ectsSum,
      combination: combination,
    };
  });
  postMessage(result);
});
