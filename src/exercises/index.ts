import { ANIMALS } from "./animals";
import { BODY } from "./body";
import { COLORS } from "./colors";
import { COUNTRIES } from "./countries";
import { FRUITS_AND_VEG } from "./fruits_and_veg";
import { ITEMS } from "./items";
import { JOBS } from "./jobs";
import { LETTERS } from "./letters";
import { NUMBERS } from "./numbers";
import { SPORT } from "./sport";
import { ZODIAC } from "./zodiac";

export type Exercise = {
  question: string;
  answer: string;
  extra?: string;
}

export function ex(question: string, answer: string, extra?: string): Exercise {
  return { question, answer, extra };
}

export const UNIQUE_SETS = [
  { name: "Litery", exercises: LETTERS },
  { name: "Kolory", exercises: COLORS },
  { name: "Zwierzęta", exercises: ANIMALS },
  { name: "Liczby", exercises: NUMBERS },
  { name: "Owoce i warzywa", exercises: FRUITS_AND_VEG },
  { name: "Sport", exercises: SPORT },
  { name: "Ciało", exercises: BODY },
  { name: "Państwa", exercises: COUNTRIES },
  { name: "Przedmioty", exercises: ITEMS },
  { name: "Zawody", exercises: JOBS },
  { name: "Znaki zodiaku", exercises: ZODIAC },
];


export const QUESTION_SETS = [
  ...UNIQUE_SETS,
  { name: "WSZYSTKO", exercises: UNIQUE_SETS.flatMap(set => set.exercises) },
];
