const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Saturn", "Venus"],
      answer: "Mars"
    },
    // Add more questions here
  ];
  
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const submitButton = document.getElementById('submit-btn');
  const timerElement = document.getElementById('time');
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60; // Change to set the time limit in seconds
  
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
      timerElement.textContent = `${timeLeft} seconds`;
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  // Event listeners
  submitButton.addEventListener('click', submitAnswer);
  
  // Start the quiz
  displayQuestion();
  startTimer();