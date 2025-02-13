interface Question {
    question: string;
    choices: string[];
    correctAnswer: string;
}

const questions: Question[] = [
    {
        question: "Which is the most spoken language in India?",
        choices: ["English", "Hindi", "Marathi", "Chinese"],
        correctAnswer: "Hindi"
    },
    {
        question: "Which language is famous for Machine Learning?",
        choices: ["Python", "Rust", "R", "Julia"],
        correctAnswer: "Python"
    }
];

let index = 0;
let score = 0;

const questionText = document.getElementById("question")!;
const choices = document.getElementById("choices")!;
const next = document.getElementById("next")!;
const scoreDisplay = document.getElementById("score")!;

function showQuestion(): void {
    if (index >= questions.length) {
        questionText.textContent = "Quiz Over!";
        choices.innerHTML = "";
        next.style.display = "none";
        scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;
        return;
    }

    const q: Question = questions[index];
    questionText.textContent = q.question;
    choices.innerHTML = "";

    q.choices.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, q.correctAnswer);
        choices.appendChild(btn);
    });
}

function checkAnswer(selected: string, correct: string): void {
    if (selected === correct) {
        score++;
    }
    nextQuestion();
}

function nextQuestion(): void {
    index++;
    showQuestion();
}

next.onclick = nextQuestion;

showQuestion();
