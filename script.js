document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const highScoresButton = document.getElementById('high-scores-button');
    const content = document.getElementById('content');
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const answerButtons = document.getElementById('answer-buttons');
    const timerDisplay = document.getElementById('timer');
    const initialsInput = document.getElementById('initials');
    const saveScoreButton = document.getElementById('save-score-button');
    const endScreen = document.getElementById('end-screen');
    const finalScoreDisplay = document.getElementById('final-score');
    const highScoresList = document.getElementById('high-scores-list');

    const questions = [
        {
            question: "Commonly used data types do NOT include?",
            answers: ["string", "boolean", "alerts", "numbers"],
            correctAnswer: "alerts"
        },
        {
            question: "The condition in an if/else statement is enclosed with _____?",
            answers: ["quotes", "parentheses", "curly brackets", "square brackets"],
            correctAnswer: "parentheses"
        },
        {
            question: "Arrays in JavaScript can be used to store _____.",
            answers: ["number and strings", "other arrays", "booleans", "all of the above"],
            correctAnswer: "all of the above"
        },
        {
            question: "String values must be enclosed in _____ when being assigned to variables.",
            answers: ["quotes", "curly brackets", "square brackets", "parentheses"],
            correctAnswer: "quotes"
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is _____.",
            answers: ["JavaScript", "terminal/bash", "console log", "for loops"],
            correctAnswer: "console log"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60; // Or any initial time you want
    let timer;

    startButton.addEventListener('click', startQuiz);

    function startQuiz() {
        content.classList.add('hide');
        quizContainer.classList.remove('hide');
        displayNextQuestion();
        // Start Timer
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
            // Update timer display
            timerDisplay.textContent = timeLeft;
        }, 1000);
    }

    function displayNextQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerText = currentQuestion.question;
        answerButtons.innerHTML = ''; // Clear previous answer buttons
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('answer-button');
            button.addEventListener('click', () => {
                handleAnswer(answer, currentQuestion.correctAnswer);
            });
            answerButtons.appendChild(button);
        });
    }

    function handleAnswer(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            score++;
        } else {
            timeLeft -= 10; // Subtract time for incorrect answer
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayNextQuestion();
        } else {
            endGame();
        }
    }

    function endGame() {
        clearInterval(timer);
        timerDisplay.textContent = '0';
        questionContainer.textContent = 'All done!';
        finalScoreDisplay.textContent = score;
        endScreen.classList.remove('hide');
    }

    saveScoreButton.addEventListener('click', saveHighScore);

    function saveHighScore() {
        // Save high score logic
    }

    highScoresButton.addEventListener('click', showHighScores);

    function showHighScores() {
        highScoresList.classList.toggle('hide'); // Toggle visibility of high scores list
    }

    // Example high scores data
    const highScoresData = [
        { initials: "ABC", score: 50 },
        { initials: "XYZ", score: 40 },
        // Add more high scores data as needed
    ];

    function displayHighScores() {
        highScoresList.innerHTML = ''; // Clear previous high scores list
        highScoresData.forEach(score => {
            const scoreItem = document.createElement('div');
            scoreItem.innerText = `${score.initials}: ${score.score}`;
            highScoresList.appendChild(scoreItem);
        });
    }
});



