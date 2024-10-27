import { useState } from "react";
import { Exercise } from "./exercises";
import { LETTERS } from "./exercises/letters";
import { ANIMALS } from "./exercises/animals";
import StringComparison from "./StringComparison";

const QUESTION_SETS = [
  { name: "Litery", exercises: LETTERS },
  { name: "Zwierzęta", exercises: ANIMALS },
];

function ResultView({
  exercise,
  answer,
}: {
  exercise: Exercise;
  answer: string;
}) {
  const correct = exercise.answer === answer;
  return (
    <div className="mb-4">
      <div>
        <span className="font-bold">Prawidłowa odpowiedź:</span>{" "}
        {exercise.answer}
        {correct ? " ✅" : " ❌"}
      </div>
      {!correct && exercise.answer.length > 1 && (
        <StringComparison correct={exercise.answer} answer={answer} />
      )}
      {exercise.extra && (
        <div>
          <span className="font-bold">Dodatkowa informacja:</span>{" "}
          {exercise.extra}
        </div>
      )}
    </div>
  );
}

function App() {
  const [questionSet, setQuestionSet] = useState(QUESTION_SETS[0]);
  const [exercise, setExercise] = useState<Exercise>(questionSet.exercises[0]);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState(false);

  const submit = () => {
    if (grade) {
      setGrade(false);
      setAnswer("");
      setExercise(
        questionSet.exercises[
          Math.floor(Math.random() * questionSet.exercises.length)
        ]
      );
    } else {
      setGrade(true);
      // TODO: update learning data
    }
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-lg mb-6">Transliteracja RU do PL</h1>
      <div className="gap-2 mb-4">
        <span className="font-bold">Zestaw: </span>
        <select
          value={questionSet.name}
          onChange={(e) => {
            const newSet = QUESTION_SETS.find(
              (q) => q.name === e.target.value
            )!;
            setQuestionSet(newSet);
            setGrade(false);
            setAnswer("");
            setExercise(
              newSet.exercises[
                Math.floor(Math.random() * newSet.exercises.length)
              ]
            );
          }}
        >
          {QUESTION_SETS.map((q) => (
            <option key={q.name} value={q.name}>
              {q.name}
            </option>
          ))}
        </select>
      </div>
      <div className="gap-2 mb-4">
        <span className="font-bold">Zadanie: </span>
        {exercise.question}
      </div>
      <div className="gap-2 mb-4">
        <span className="font-bold">Odpowiedź: </span>
        <input
          className="mb-4 border border-gray-300 rounded p-2"
          type="text"
          // tabIndex={-1}
          autoFocus={true}
          contentEditable={!grade}
          value={answer}
          onChange={(e) => {
            if (!grade) {
              setAnswer(e.target.value.trim().toLocaleLowerCase());
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
        />
        <button
          className="border border-gray-300 rounded p-2"
          onClick={submit}
        >
          {grade ? "Następne" : "Oceń"}
        </button>
      </div>
      {grade && <ResultView exercise={exercise} answer={answer} />}
    </div>
  );
}

export default App;
