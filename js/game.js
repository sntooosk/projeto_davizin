const MAX_QUESTIONS_MAIN_PROGRESS = 8;
let totalScore = 0;

const quizzes = [
    {
        element: 'quiz1',
        questions: [
        {
            question: 'Pergunta relacionada ao bullying?',
            options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
            correctAnswer: 'A'
        },
        {
            question: 'Pergunta relacionada ao bullying?2',
            options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
            correctAnswer: 'A'
        },
        {
            question: 'Pergunta relacionada ao bullying?3',
            options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
            correctAnswer: 'A'
        },
        {
            question: 'Pergunta relacionada ao bullying?4',
            options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
            correctAnswer: 'A'
        }
        ],
        currentQuestionIndex: 0,
        score: 0,
        hasAnswered: false
    },
    {
        element: 'quiz2',
        questions: [
            {
                question: 'Pergunta relacionada ao bullying?',
                options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
                correctAnswer: 'B'
            },
            {
                question: 'Pergunta relacionada ao bullying?2',
                options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
                correctAnswer: 'B'
            },
            {
                question: 'Pergunta relacionada ao bullying?3',
                options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
                correctAnswer: 'B'
            },
            {
                question: 'Pergunta relacionada ao bullying?4',
                options: { A: 'Bullying', B: 'Cyberbullying', C: 'Bullying escolar', D: 'Outro' },
                correctAnswer: 'B'
            }
        ],
        currentQuestionIndex: 0,
        score: 0,
        hasAnswered: false
    }
];

function displayQuestion(quizIndex) {
    const quiz = quizzes[quizIndex];
    const questionElement = document.getElementById(`question${quizIndex + 1}`);
    const optionsElement = document.querySelector(`#${quiz.element} .options`);
    const question = quiz.questions[quiz.currentQuestionIndex];
    console.log(questionElement)

    console.log(question.question)
    questionElement.innerHTML = `<p>${question.question}</p>`;

    optionsElement.innerHTML = '';
    for (const [key, value] of Object.entries(question.options)) {
        const button = document.createElement('button');
        button.textContent = `${key}. ${value}`;
        button.onclick = () => checkAnswer(quizIndex, key, button);
        optionsElement.appendChild(button);
    }

    document.getElementById(`message${quizIndex + 1}`).textContent = '';
    quiz.hasAnswered = false;
}

function checkAnswer(quizIndex, answer, button) {
    const quiz = quizzes[quizIndex];
    if (quiz.hasAnswered) return;

    const correctAnswer = quiz.questions[quiz.currentQuestionIndex].correctAnswer;
    const messageElement = document.getElementById(`message${quizIndex + 1}`);
    if (answer === correctAnswer) {
        messageElement.textContent = 'Correto!';
        quiz.score = Math.min(quiz.score + 1, quiz.questions.length);
        updateScore(quizIndex);
    } else {
        messageElement.textContent = 'Incorreto. Tente novamente!';
    }

    const buttons = document.querySelectorAll(`#${quiz.element} .options button`);
    buttons.forEach(btn => btn.disabled = true);

    quiz.hasAnswered = true;
    setTimeout(() => nextQuestion(quizIndex), 2000);
}

function updateScore(quizIndex) {
    const quiz = quizzes[quizIndex];
    const scoreElement = document.getElementById(`score${quizIndex + 1}`);
    const progressBarSpan = document.getElementById(`progress-bar-span${quizIndex + 1}`);
    const progressWidth = (quiz.score / quiz.questions.length) * 100;
    scoreElement.textContent = `Pontuação: ${quiz.score} de ${quiz.questions.length}`;
    progressBarSpan.style.width = `${progressWidth}%`;
}

function finishQuiz(quizIndex) {
    const quiz = quizzes[quizIndex];
    totalScore += quiz.score;
    updateMainScore();
    alert(`Obrigado por jogar! Sua pontuação final foi ${quiz.score}`);
}

function updateMainScore() {
    const totalQuestions = MAX_QUESTIONS_MAIN_PROGRESS;
    const mainScoreElement = document.getElementById('main-score');
    const mainProgressBarSpan = document.getElementById('main-progress-bar-span');
    const mainProgressWidth = (totalScore / totalQuestions) * 100;
    mainScoreElement.textContent = `Pontuação Total: ${totalScore} de ${totalQuestions}`;
    mainProgressBarSpan.style.width = `${mainProgressWidth}%`;
}

function nextQuestion(quizIndex) {
    const quiz = quizzes[quizIndex];
    if (quiz.currentQuestionIndex < quiz.questions.length - 1) {
        quiz.currentQuestionIndex++;
        displayQuestion(quizIndex);
    } else {
        showFinalScreen(quizIndex);
    }
}

function showFinalScreen(quizIndex) {
    const array = [] 
    array.push(document.getElementById(`question${quizIndex + 1}`))
    array.push(document.getElementById((`options${quizIndex + 1}`)))
    array.push(document.getElementById(`message${quizIndex + 1}`))
    array.push(document.getElementById((`progress${quizIndex + 1}`)))

    array.map((item) => {item.style.display = "none"})

    const finalScreen = document.getElementById(`final-screen${quizIndex + 1}`);
    finalScreen.style.display = 'inherit';
    document.getElementById(`final-score${quizIndex + 1}`).textContent = `Pontuação Final: ${quizzes[quizIndex].score}`;
}

function restartQuiz(quizIndex) {
    const quiz = quizzes[quizIndex];
    quiz.currentQuestionIndex = 0;
    quiz.score = 0;
    document.getElementById(`progress-bar-span${quizIndex + 1}`).style.width = '0';
    document.getElementById(`final-screen${quizIndex + 1}`).style.display = 'none';
    const array = [] 
    array.push(document.getElementById(`question${quizIndex + 1}`))
    array.push(document.getElementById((`options${quizIndex + 1}`)))
    array.push(document.getElementById(`message${quizIndex + 1}`))
    array.push(document.getElementById((`progress${quizIndex + 1}`)))

    array.map((item) => {item.style.display = "inherit"})

    displayQuestion(quizIndex);
    updateScore(quizIndex);
}

displayQuestion(0);
displayQuestion(1);
