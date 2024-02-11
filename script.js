const quizData = [
    {
      question: "What type of programming language is Javascript?",
      options: ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"],
      answer: "Object-Based"
    },
    {
      question: "Which one of the following is also known as a conditional expression?",
      options: ["Alternative to if-else", "Switch statement", "If-then-else statement", "Immediate if"],
      answer: "Immediate if"
    },
    {
      question: "What is a block of statement in JavaScript?",
      options: ["Conditional block", "block that combines a number of statements into a single compound statement", "both conditional block and a single statement", "block that contatins a single statement"],
      answer: "block that combines a number of statements into a single compound statement"
    },
    {
      question: "When an interpreter encounters an empty statements, what will it do?",
      options: ["Shows a warning", "Prompts to complete the statement", "Throws an error", "Ignores the statement"],
      answer: "Ignores the statement"
    },
    {
      question: "The 'function' and 'var' are known as:",
      options: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
      answer: "Declaration statements"
    }
    // Add more questions here
  ];
  
  const startButton = document.getElementById('start-btn');
  const startContainer = document.getElementById('start-container');
  const quiz = document.getElementById('quiz');
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const submitButton = document.getElementById('submit-btn');
  const timerElement = document.getElementById('time');
  const timer = document.getElementById('timer');
  const highScores = document.getElementById('scores-list')
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 30; // Change to set the time limit in seconds

  function displayStart() {
    startContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    timer.style.display = 'none';
    quiz.style.display = 'none';
    highScores.style.display = 'none';
  }
  
  function startQuiz() {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    timer.style.display = 'block';
    quiz.style.display = 'block';
    highScores.style.display = 'none';
    displayQuestion();
    startTimer();
  }
  
  // Display the current question and options
  function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = 'option';
      radioInput.value = option;
      radioInput.id = `option${index}`;
  
      const label = document.createElement('label');
      label.textContent = option;
      label.setAttribute('for', `option${index}`);
  
      optionsElement.appendChild(radioInput);
      optionsElement.appendChild(label);
      optionsElement.appendChild(document.createElement('br'));
    });
  }
  
  // Check the selected answer and move to the next question
  function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
      alert('Please select an option!');
      return;
    }
  
    if (selectedOption.value === quizData[currentQuestionIndex].answer) {
      score++;
    } else {
      // If the selected option is incorrect, subtract time
      timeLeft -= 5; // Adjust the time penalty as needed
      if (timeLeft < 0) {
        timeLeft = 0; // Ensure timeLeft doesn't go negative
      }
      timerElement.textContent = `${timeLeft}`;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  let quizEnded = false;

  // End the quiz and display the result
  function endQuiz() {
    // Check if the quiz has already ended
    if (quizEnded) {
      return;
    }
    
    quizEnded = true; // Set the flag to true to indicate that the quiz has ended
    
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    timer.style.display = 'none';
    document.getElementById('result').textContent = `Your score: ${score}/${quizData.length}`;
    // Delay prompting for initials to give time for the result to be seen
    setTimeout(() => {
      const name = prompt("Please enter your initials: ");
      saveScore(name, score);
      highScores.style.display = 'block';
    }, 1000); // Adjust delay time as needed
  }
  
  // Start the timer
  function startTimer() {
    const timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `${timeLeft}`;
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  // Event listeners
  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', submitAnswer);
  
  // Start the quiz
  displayStart();

// Function to save score to localStorage
function saveScore(name, score) {
  // Retrieve previous scores from localStorage or initialize an empty array
  const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];

  // Add the current score to the saved scores array
  savedScores.push({name: name, score: score});

  // Store the updated scores back to localStorage
  localStorage.setItem('quizScores', JSON.stringify(savedScores));
}

// Function to display saved scores
function displayScores() {
  // Retrieve saved scores from localStorage
  const savedScores = JSON.parse(localStorage.getItem('quizScores'));

  // Display saved scores in the UI
  if (savedScores) {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = ''; // Clear previous scores

    savedScores.forEach((scoreObj, index) => {
      const scoreItem = document.createElement('li');
      scoreItem.textContent = `${scoreObj.name}: ${scoreObj.score}`;
      scoresList.appendChild(scoreItem);
    });
  }
}

// Call displayScores() function to display saved scores
document.addEventListener('DOMContentLoaded', function () {
  displayScores(); // Call displayScores when the page finishes loading
});