import { useEffect, useState } from "react";
import type { CombinationWithGrade, Subject } from "../utils/utils";
import { useGroups } from "./useGroups";
import { useSubjects } from "./useSubjects";
import GradeWorker from "../utils/worker?worker";

const determineAmountWorkers = (combinations: number) => (combinations <= 10 ? 1 : 3);

function splitIntoChunks(combinations: Subject[][]) {
  const n = determineAmountWorkers(combinations.length);

  const result: Subject[][][] = [];
  const baseSize = Math.floor(combinations.length / n);
  const extra = combinations.length % n;

  let start = 0;

  for (let i = 0; i < n; i++) {
    const size = baseSize + (i < extra ? 1 : 0);
    result.push(combinations.slice(start, start + size));
    start += size;
  }

  return result;
}

export const useGradesOfCombinations = () => {
  const { subjects } = useSubjects();
  const groups = useGroups();
  // eslint-disable-next-line
  const [results, setResults] = useState<CombinationWithGrade[][]>([]);
  const [result, setResult] = useState<CombinationWithGrade[]>([]);

  const subjectsInGroup = (group: string) => subjects.filter((entry) => entry.group === group);

  useEffect(() => {
    const combinations = groups.reduce(
      (acc, group) =>
        acc.flatMap((tuple) =>
          [[], ...subjectsInGroup(group).map((subject) => [subject])].map((item) => [...tuple, ...item])
        ),
      [[]] as Array<Array<Subject>>
    );

    const chunks = splitIntoChunks(combinations);
    setResults(Array(chunks.length).fill(null));

    chunks.forEach((chunk, idx) => {
      const worker = new GradeWorker();
      worker.onmessage = (event: MessageEvent<CombinationWithGrade[]>) => {
        console.log("Received result from worker of chunk " + idx);
        setResults((prev) => {
          const newResults = [...prev];
          newResults[idx] = event.data;

          if (newResults.every((result) => result !== null)) {
            setResult(newResults.flat());
          }

          return newResults;
        });
      };
      worker.postMessage({ chunk, subjects });
    });
  }, [subjects]);

  return result.sort((a, b) => a.totalGrade - b.totalGrade);
};
