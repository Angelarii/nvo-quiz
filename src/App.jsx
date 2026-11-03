import { useState } from "react";
 
// Въпросите засега са тук, в кода. По-късно ще ги преместим в базата данни (Supabase).
// "answer" е номерът на верния отговор, като броим от 0.
const questions = [
  {
    topic: "Проценти",
    text: "Колко е 15% от 240?",
    options: ["24", "36", "48", "30"],
    answer: 1,
    explanation: "15% = 0,15, а 0,15 · 240 = 36.",
  },
  {
    topic: "Уравнения",
    text: "Решете уравнението 3x − 7 = 11.",
    options: ["x = 4", "x = 6", "x = 18", "x = 1⅓"],
    answer: 1,
    explanation: "3x = 11 + 7 = 18, следователно x = 18 : 3 = 6.",
  },
  {
    topic: "Геометрия",
    text: "Колко е лицето на правоъгълник със страни 8 см и 5 см?",
    options: ["26 кв. см", "13 кв. см", "40 кв. см", "80 кв. см"],
    answer: 2,
    explanation: "Лице = дължина · ширина = 8 · 5 = 40 кв. см. (26 см е периметърът.)",
  },
  {
    topic: "Рационални числа",
    text: "Колко е стойността на израза (−3)² − 2 · 4?",
    options: ["−17", "1", "17", "−1"],
    answer: 1,
    explanation: "(−3)² = 9, защото минус по минус дава плюс. 9 − 8 = 1.",
  },
  {
    topic: "Проценти",
    text: "Цената на книга е 50 €. Намаляват я с 20%. Каква е новата цена?",
    options: ["30 €", "45 €", "40 €", "10 €"],
    answer: 2,
    explanation: "20% от 50 € е 10 €, следователно новата цена е 50 − 10 = 40 €.",
  },
];
 
export default function App() {
  const [current, setCurrent] = useState(0); // номер на текущия въпрос
  const [selected, setSelected] = useState(null); // избраният отговор (null = още няма)
  const [results, setResults] = useState([]); // [{ topic, correct }, ...]
 
  function choose(index) {
    if (selected !== null) return; // вече е отговорено
    setSelected(index);
    const q = questions[current];
    setResults([...results, { topic: q.topic, correct: index === q.answer }]);
  }
 
  function next() {
    setSelected(null);
    setCurrent(current + 1);
  }
 
  function restart() {
    setCurrent(0);
    setSelected(null);
    setResults([]);
  }
 
  // --- Екран с резултата ---
  if (current >= questions.length) {
    const score = results.filter((r) => r.correct).length;
    const weakTopics = [...new Set(results.filter((r) => !r.correct).map((r) => r.topic))];
 
    return (
      <div className="card">
        <h1>Резултат</h1>
        <p className="score">
          {score} от {questions.length} верни
        </p>
        {weakTopics.length > 0 ? (
          <p>Теми за преговор: <strong>{weakTopics.join(", ")}</strong></p>
        ) : (
          <p>Отлично! Нямаш грешки.</p>
        )}
        <button className="primary" onClick={restart}>Опитай отново</button>
      </div>
    );
  }
 
  // --- Екран с въпрос ---
  const q = questions[current];
 
  return (
    <div className="card">
      <p className="meta">
        Въпрос {current + 1} от {questions.length} · {q.topic}
      </p>
      <h2>{q.text}</h2>
 
      <div className="options">
        {q.options.map((option, index) => {
          let className = "option";
          if (selected !== null && index === q.answer) className += " correct";
          if (selected === index && index !== q.answer) className += " wrong";
          return (
            <button key={index} className={className} onClick={() => choose(index)}>
              {option}
            </button>
          );
        })}
      </div>
 
      {selected !== null && (
        <>
          <p className="explanation">{q.explanation}</p>
          <button className="primary" onClick={next}>
            {current + 1 < questions.length ? "Следващ въпрос" : "Виж резултата"}
          </button>
        </>
      )}
    </div>
  );
}
 