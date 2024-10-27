export type Exercise = {
  question: string;
  answer: string;
  extra?: string;
}

export function ex(question: string, answer: string, extra?: string): Exercise {
  return { question, answer, extra };
}
