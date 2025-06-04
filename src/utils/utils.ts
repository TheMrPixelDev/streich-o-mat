/*export type Group =
  | "PFLICHTMODUL"
  | "GRUNDLAGEN"
  | "MATHE_UND_THEORIE"
  | "PRAKTISCHE_INFORMATIK"
  | "INFORMATIONSSYSTEME_UND_SICHERHEIT"
  | "WAHLPFLICHT"
  | "WAHLFACH";

export const Groups: Group[] = [
  "GRUNDLAGEN",
  "INFORMATIONSSYSTEME_UND_SICHERHEIT",
  "MATHE_UND_THEORIE",
  "PFLICHTMODUL",
  "PRAKTISCHE_INFORMATIK",
  "WAHLFACH",
  "WAHLPFLICHT",
];
*/

export type Subject = {
  group: string;
  name: string; // ID
  ects: number;
  grade: number;
};

export type CombinationWithGrade = {
  totalGrade: number;
  combination: Subject[];
};

export const getSubjectMessages = (subject: Partial<Subject>, subjects: Subject[]) => {
  return [
    (subject.ects ?? 0 > 0) || "Die ECTS müssen mehr als 0 sein.",
    ((subject.grade ?? 0 > 0) && (subject.grade ?? 0 < 4)) || "Die Note muss zwischen 1.0 und 4.0 sein.",
    (subject.name ?? "").length > 0 || "Es muss ein valider Name angegeben werden.",
    subjects.every((s) => s.name !== subject.name) || "Der Name darf nicht schon vorhanden sein.",
    subject.group !== undefined || "Es muss eine Modulgruppe angegeben werden.",
  ].filter((message) => typeof message !== "boolean" && typeof message !== "number");
};

export const isSubject = (subject: Partial<Subject>, subjects: Subject[]): subject is Subject => {
  return getSubjectMessages(subject, subjects).length === 0;
};
