var questions = [
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
var index = 0;
var score = 0;
var questionText = document.getElementById("question");
var choices = document.getElementById("choices");
var next = document.getElementById("next");
var scoreDisplay = document.getElementById("score");
function showQuestion() {
    if (index >= questions.length) {
        questionText.textContent = "Quiz Over!";
        choices.innerHTML = "";
        next.style.display = "none";
        scoreDisplay.textContent = "Your Score: ".concat(score, " / ").concat(questions.length);
        return;
    }
    var q = questions[index];
    questionText.textContent = q.question;
    choices.innerHTML = "";
    q.choices.forEach(function (option) {
        var btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = function () { return checkAnswer(option, q.correctAnswer); };
        choices.appendChild(btn);
    });
}
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
    }
    nextQuestion();
}
function nextQuestion() {
    index++;
    showQuestion();
}
next.onclick = nextQuestion;
showQuestion();
