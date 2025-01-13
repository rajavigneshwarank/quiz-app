const questions = [
    {

        question: "Who is considered the creator of Javascript?",
        answers: [
            {text: "Brendan Eich", correct: true},
            {text: "Tim Berners-Lee", correct: false},
            {text: "John Resig", correct: false},
            {text: "Mark Zuckerberg", correct: false},
        ]
    },
    {

        question: "When was the first version of HTML officially released?",
        answers: [
            {text: "1989", correct: false},
            {text: "1991", correct: true},
            {text: "1995", correct: false},
            {text: "2000", correct: false},
        ]
    },
    {

        question: "Whos is credited with creating CSS(Cascading style sheet?",
        answers: [
            {text: "Tim Berners-Lee", correct: false},
            {text: "Jeff Bezos", correct: false},
            {text: "Hakon Wium Lie", correct: true},
            {text: "Mark Zuckerberg", correct: false},
        ]
    },
    {

        question: "In which year was JavaScript was introduced?",
        answers: [
            {text: "1989", correct: false},
            {text: "1991", correct: false},
            {text: "2000", correct: false},
            {text: "1995", correct: true},
        ]
    }
];

const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
 
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();