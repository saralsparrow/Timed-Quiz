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
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 90; // Change to set the time limit in seconds

  function displayStart() {
    startContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    timer.style.display = 'none';
    quiz.style.display = 'none';
  }
  
  function startQuiz() {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    timer.style.display = 'block';
    quiz.style.display = 'block';
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
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  // End the quiz and display the result
  function endQuiz() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    document.getElementById('result').textContent = `Your score: ${score}/${quizData.length}`;
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