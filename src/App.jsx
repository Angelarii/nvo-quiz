import { useState } from "react";

// ---------------------------------------------------------------
// ВЪПРОСИ
// Засега са тук, в кода. По-късно ще ги преместим в базата данни.
// "answer" е номерът на верния отговор, като броим от 0.
// ---------------------------------------------------------------
const questions = [
  // Проценти
  { topic: "Проценти", text: "Колко е 15% от 240?", options: ["24", "36", "48", "30"], answer: 1, explanation: "15% = 0,15, а 0,15 · 240 = 36." },
  { topic: "Проценти", text: "Цената на книга е 50 €. Намаляват я с 20%. Каква е новата цена?", options: ["30 €", "45 €", "40 €", "10 €"], answer: 2, explanation: "20% от 50 € е 10 €, следователно новата цена е 50 − 10 = 40 €." },
  { topic: "Проценти", text: "30% от едно число е 12. Кое е числото?", options: ["36", "40", "4", "120"], answer: 1, explanation: "Ако 0,3 · x = 12, то x = 12 : 0,3 = 40." },
  { topic: "Проценти", text: "Цена от 80 € се увеличава с 25%. Каква е новата цена?", options: ["105 €", "100 €", "20 €", "85 €"], answer: 1, explanation: "25% от 80 € е 20 €, следователно новата цена е 80 + 20 = 100 €." },

  // Уравнения
  { topic: "Уравнения", text: "Решете уравнението 3x − 7 = 11.", options: ["x = 4", "x = 6", "x = 18", "x = 1⅓"], answer: 1, explanation: "3x = 11 + 7 = 18, следователно x = 18 : 3 = 6." },
  { topic: "Уравнения", text: "Решете уравнението 2(x + 3) = 14.", options: ["x = 5,5", "x = 8", "x = 4", "x = 7"], answer: 2, explanation: "Разкриваме скобите: 2x + 6 = 14, следователно 2x = 8 и x = 4." },
  { topic: "Уравнения", text: "Решете уравнението x/4 + 1 = 3.", options: ["x = 8", "x = 16", "x = 2", "x = 12"], answer: 0, explanation: "x/4 = 3 − 1 = 2, следователно x = 2 · 4 = 8." },
  { topic: "Уравнения", text: "Решете уравнението 5x − 3 = 2x + 9.", options: ["x = 2", "x = 3", "x = 4", "x = 12"], answer: 2, explanation: "5x − 2x = 9 + 3, т.е. 3x = 12, следователно x = 4." },

  // Геометрия
  { topic: "Геометрия", text: "Колко е лицето на правоъгълник със страни 8 см и 5 см?", options: ["26 кв. см", "13 кв. см", "40 кв. см", "80 кв. см"], answer: 2, explanation: "Лице = дължина · ширина = 8 · 5 = 40 кв. см. (26 см е периметърът.)" },
  { topic: "Геометрия", text: "Два от ъглите на триъгълник са 50° и 70°. Колко градуса е третият ъгъл?", options: ["60°", "120°", "70°", "50°"], answer: 0, explanation: "Сборът от ъглите в триъгълник е 180°: 180 − 50 − 70 = 60°." },
  { topic: "Геометрия", text: "Квадрат има периметър 36 см. Колко е лицето му?", options: ["36 кв. см", "81 кв. см", "144 кв. см", "9 кв. см"], answer: 1, explanation: "Страната е 36 : 4 = 9 см, а лицето е 9 · 9 = 81 кв. см." },
  { topic: "Геометрия", text: "Триъгълник има основа 10 см и височина към нея 6 см. Колко е лицето му?", options: ["60 кв. см", "30 кв. см", "16 кв. см", "15 кв. см"], answer: 1, explanation: "Лице = (основа · височина) : 2 = (10 · 6) : 2 = 30 кв. см." },

  // Рационални числа
  { topic: "Рационални числа", text: "Колко е стойността на израза (−3)² − 2 · 4?", options: ["−17", "1", "17", "−1"], answer: 1, explanation: "(−3)² = 9, защото минус по минус дава плюс. 9 − 8 = 1." },
  { topic: "Рационални числа", text: "Пресметнете −5 + 12 − (−3).", options: ["4", "10", "−10", "20"], answer: 1, explanation: "−5 + 12 = 7, а изваждането на −3 е същото като събиране с 3: 7 + 3 = 10." },
  { topic: "Рационални числа", text: "Колко е (−2)³?", options: ["8", "−6", "−8", "6"], answer: 2, explanation: "(−2) · (−2) · (−2) = 4 · (−2) = −8. Нечетна степен на отрицателно число е отрицателна." },
  { topic: "Рационални числа", text: "Пресметнете 3/4 + 1/2.", options: ["4/6", "5/4", "3/8", "1/2"], answer: 1, explanation: "Привеждаме към общ знаменател: 3/4 + 2/4 = 5/4 (= 1 цяло и 1/4)." },
];

const topics = [
  { name: "Проценти", icon: "%", description: "Отстъпки, поскъпвания, част от число" },
  { name: "Уравнения", icon: "x", description: "Линейни уравнения и разкриване на скоби" },
  { name: "Геометрия", icon: "△", description: "Лица, периметри и ъгли" },
  { name: "Рационални числа", icon: "±", description: "Отрицателни числа, степени, дроби" },
];

const SITE_NAME = "Подготви се за изпит";

// ---------------------------------------------------------------
// ГЛАВЕН КОМПОНЕНТ: решава кой екран да покаже
// ---------------------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState("home"); // "home" | "quiz" | "results"
  const [quizTitle, setQuizTitle] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [results, setResults] = useState([]);

  function startQuiz(topicName) {
    const selected = topicName ? questions.filter((q) => q.topic === topicName) : questions;
    setQuizTitle(topicName || "Пълен тест");
    setQuizQuestions(selected);
    setResults([]);
    setScreen("quiz");
    window.scrollTo(0, 0);
  }

  function finishQuiz(finalResults) {
    setResults(finalResults);
    setScreen("results");
    window.scrollTo(0, 0);
  }

  function goHome() {
    setScreen("home");
    window.scrollTo(0, 0);
  }

  return (
    <div className="page">
      <Header onHome={goHome} onStart={() => startQuiz(null)} />

      <main>
        {screen === "home" && <Home onStart={startQuiz} />}
        {screen === "quiz" && (
          <Quiz title={quizTitle} questions={quizQuestions} onFinish={finishQuiz} onExit={goHome} />
        )}
        {screen === "results" && (
          <Results
            title={quizTitle}
            results={results}
            onRetry={() => startQuiz(quizTitle === "Пълен тест" ? null : quizTitle)}
            onHome={goHome}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------
// ГОРНА ЛЕНТА
// ---------------------------------------------------------------
function Header({ onHome, onStart }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <button className="logo" onClick={onHome}>
          <span className="logo-mark">√</span> {SITE_NAME}
        </button>
        <button className="btn btn-small" onClick={onStart}>Започни тест</button>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------
// НАЧАЛНА СТРАНИЦА
// ---------------------------------------------------------------
function Home({ onStart }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="badge">Математика · 7. клас</span>
            <h1>Подготви се за НВО по математика</h1>
            <p className="lead">
              Решавай задачи, виж подробно решение след всеки отговор и разбери кои теми трябва да преговориш.
              Безплатно и без регистрация.
            </p>
            <div className="hero-actions">
              <button className="btn" onClick={() => onStart(null)}>Започни пълен тест</button>
              <a className="btn btn-ghost" href="#topics">Избери тема</a>
            </div>
            <div className="stats">
              <div><strong>{questions.length}</strong><span>задачи</span></div>
              <div><strong>{topics.length}</strong><span>теми</span></div>
              <div><strong>0 €</strong><span>цена</span></div>
            </div>
          </div>

          <div className="hero-preview" aria-hidden="true">
            <div className="preview-card">
              <p className="meta">Въпрос 3 от 16 · Проценти</p>
              <p className="preview-q">30% от едно число е 12. Кое е числото?</p>
              <div className="preview-option">36</div>
              <div className="preview-option correct">40 ✓</div>
              <div className="preview-option">120</div>
            </div>
          </div>
        </div>
      </section>

      <section id="topics" className="section">
        <div className="container">
          <h2>Упражнявай по тема</h2>
          <p className="section-sub">Избери тема и реши кратък тест само по нея.</p>
          <div className="topic-grid">
            {topics.map((t) => {
              const count = questions.filter((q) => q.topic === t.name).length;
              return (
                <button key={t.name} className="topic-card" onClick={() => onStart(t.name)}>
                  <span className="topic-icon">{t.icon}</span>
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                  <span className="topic-count">{count} задачи →</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Как работи</h2>
          <div className="steps">
            <div className="step">
              <span className="step-num">1</span>
              <h3>Избери тест</h3>
              <p>Пълен тест с всички теми или кратък тест по една тема.</p>
            </div>
            <div className="step">
              <span className="step-num">2</span>
              <h3>Решавай и учи</h3>
              <p>След всеки отговор виждаш дали е верен и как се решава задачата.</p>
            </div>
            <div className="step">
              <span className="step-num">3</span>
              <h3>Виж слабите си места</h3>
              <p>Накрая получаваш резултат по теми и знаеш какво да преговориш.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container teachers">
          <div>
            <span className="badge badge-soon">Скоро</span>
            <h2>За учители</h2>
            <p className="section-sub">
              Създавайте тестове за класа си за минути, споделяйте задачи с други учители и вижте кои теми
              затрудняват учениците ви.
            </p>
            <ul className="checklist">
              <li>Обща библиотека от задачи, която учителите подобряват заедно</li>
              <li>Код за клас — учениците влизат без имейл</li>
              <li>Автоматична проверка и отчет по теми</li>
            </ul>
          </div>
          <div className="teacher-report" aria-hidden="true">
            <p className="meta">Отчет за 7. Б клас</p>
            {[
              ["Проценти", 82],
              ["Уравнения", 64],
              ["Геометрия", 47],
              ["Рационални числа", 71],
            ].map(([name, value]) => (
              <div key={name} className="bar-row">
                <span>{name}</span>
                <div className="bar"><div className="bar-fill" style={{ width: `${value}%` }} /></div>
                <span className="bar-value">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------
// ТЕСТ
// ---------------------------------------------------------------
function Quiz({ title, questions, onFinish, onExit }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);

  const q = questions[current];
  const progress = ((current + (selected !== null ? 1 : 0)) / questions.length) * 100;

  function choose(index) {
    if (selected !== null) return;
    setSelected(index);
    setResults([...results, { question: q, chosen: index, correct: index === q.answer }]);
  }

  function next() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      onFinish(results);
    }
  }

  return (
    <section className="section">
      <div className="container narrow">
        <div className="quiz-top">
          <button className="link" onClick={onExit}>← Към началото</button>
          <span className="meta">{title}</span>
        </div>
        <div className="progress"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

        <div className="card">
          <p className="meta">Въпрос {current + 1} от {questions.length} · {q.topic}</p>
          <h2 className="question">{q.text}</h2>

          <div className="options">
            {q.options.map((option, index) => {
              let className = "option";
              if (selected !== null && index === q.answer) className += " correct";
              if (selected === index && index !== q.answer) className += " wrong";
              return (
                <button key={index} className={className} onClick={() => choose(index)} disabled={selected !== null}>
                  <span className="option-letter">{"АБВГ"[index]}</span>
                  {option}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <>
              <div className={`explanation ${selected === q.answer ? "ok" : "bad"}`}>
                <strong>{selected === q.answer ? "Вярно!" : "Грешно."}</strong> {q.explanation}
              </div>
              <button className="btn" onClick={next}>
                {current + 1 < questions.length ? "Следващ въпрос →" : "Виж резултата"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// РЕЗУЛТАТИ
// ---------------------------------------------------------------
function Results({ title, results, onRetry, onHome }) {
  const score = results.filter((r) => r.correct).length;
  const percent = Math.round((score / results.length) * 100);

  // Групираме резултатите по тема
  const byTopic = {};
  for (const r of results) {
    const t = r.question.topic;
    if (!byTopic[t]) byTopic[t] = { correct: 0, total: 0 };
    byTopic[t].total += 1;
    if (r.correct) byTopic[t].correct += 1;
  }

  const mistakes = results.filter((r) => !r.correct);

  let message = "Продължавай да упражняваш — всяка грешка е урок!";
  if (percent >= 90) message = "Отлично представяне! 🎉";
  else if (percent >= 70) message = "Много добре! Още малко упражнения и си готов.";
  else if (percent >= 50) message = "Добро начало. Обърни внимание на слабите теми.";

  return (
    <section className="section">
      <div className="container narrow">
        <div className="card results-card">
          <p className="meta">{title}</p>
          <div className="score-circle" style={{ "--p": percent }}>
            <span>{percent}%</span>
          </div>
          <h2>{score} от {results.length} верни</h2>
          <p className="section-sub">{message}</p>

          <h3 className="results-heading">Резултат по теми</h3>
          {Object.entries(byTopic).map(([name, s]) => {
            const p = Math.round((s.correct / s.total) * 100);
            return (
              <div key={name} className="bar-row">
                <span>{name}</span>
                <div className="bar"><div className={`bar-fill ${p < 50 ? "low" : ""}`} style={{ width: `${p}%` }} /></div>
                <span className="bar-value">{s.correct}/{s.total}</span>
              </div>
            );
          })}

          <div className="hero-actions center">
            <button className="btn" onClick={onRetry}>Опитай отново</button>
            <button className="btn btn-ghost" onClick={onHome}>Към началото</button>
          </div>
        </div>

        {mistakes.length > 0 && (
          <div className="card">
            <h3 className="results-heading">Прегледай грешките си</h3>
            {mistakes.map((m, i) => (
              <div key={i} className="mistake">
                <p className="mistake-q">{m.question.text}</p>
                <p>Твоят отговор: <span className="wrong-text">{m.question.options[m.chosen]}</span></p>
                <p>Верен отговор: <span className="right-text">{m.question.options[m.question.answer]}</span></p>
                <p className="meta">{m.question.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// ДОЛНА ЛЕНТА
// ---------------------------------------------------------------
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
        <span>Задачи за подготовка за НВО по математика след 7. клас</span>
      </div>
    </footer>
  );
}