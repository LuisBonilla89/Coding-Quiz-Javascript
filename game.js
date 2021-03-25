var questions = [
  {
    question:
      "Which of the following data-type can be stored in a Javascript array?",
    choices: ["numbers", "strings", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question: "How?",
    choices: ["numbers", "strings", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question:
      "Which of the following is a commonly used practice for debugging and printing messages ?",
    choices: ["terminal/gitbash", "console.log", "Javacript", "if-statement"],
    answer: "console.log",
  },
  {
    question:
      "Which of the following data-type can be stored in a Javascript array?",
    choices: ["numbers", "strings", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question:
      "Which of the following is commonly used for debugging and prining messages ?",
    choices: ["terminal/gitbash", "console.log", "Javacript", "if-statement"],
    answer: "console.log",
  },
];

var score = 0;
var questionIndex = 0;

//declaring variables
var actualTime = document.querySelector("#actualTime");
var timer = document.querySelector("#play");
var quizQuestions = document.querySelector("#quizQuestions");
var wrapper = document.querySelector("#wrapper");

var timeLeft = 41;

var holdInterval = 0;

var penalty = 5;

var createUl = document.createElement("ul");

timer.addEventListener("click", function () {
  if (holdInterval === 0)
    holdInterval = setInterval(function () {
      timeLeft--;
      actualTime.textContent = "Time: " + timeLeft;

      if (timeLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        actualTime.textContent = "Time up!";
      }
    }, 1000);
  render(questionIndex);
});

//The following function displays the question and choices to the page
function render(questionIndex) {
  //The following 2 lines of code clear the current HTML data
  quizQuestions.innerHTML = "";
  createUl.innerHTML = "";
  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].question;
    var userChoices = questions[questionIndex].choices;
    quizQuestions.textContent = userQuestion;
  }
  //New stuff for question choices
  userChoices.forEach(function (newItem) {
    var itemList = document.createElement("li");
    itemList.textContent = newItem;
    quizQuestions.appendChild(createUl);
    createUl.appendChild(itemList);
    itemList.addEventListener("click", compare);
  });
}

//The following function compares the choices with the correct answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newDiv");

    if (element.textContent == questions[questionIndex].answer) {
      score++;
      newDiv.textContent =
        "Well done! The answer is: " + questions[questionIndex].answer;
    } else {
      timeLeft = timeLeft - penalty;
      newDiv.textContent =
        "Incorrect! The correct answer is: " + questions[questionIndex].answer;
    }
  }
  questionIndex++;

  if (questionIndex >= questions.length) {
    allDone();
    newDiv.textContent =
      "This is the end of the Quiz " +
      "You have got " +
      score +
      "/" +
      questions.length +
      " correct";
  } else {
    render(questionIndex);
  }
  quizQuestions.appendChild(newDiv);
}
//Using allDone to append the last page
function allDone() {
  quizQuestions.innerHTML = "";
  timer.innerHTML = "";
  //H1 Tittle
  var new_H1 = document.createElement("h1");
  new_H1.setAttribute("id", "new_H1");
  new_H1.textContent = "The test has finished!";

  quizQuestions.appendChild(new_H1);

  //Paragraph
  var newPara = document.createElement("p");
  newPara.setAttribute("id", "newPara");

  quizQuestions.appendChild(newPara);

  //calculate the remaining time and score
  if (timeLeft >= 0) {
    var timeRemaining = timeLeft;
    var nPara2 = document.createElement("p");
    clearInterval(holdInterval);
    newPara.textContent = "Your total score is: " + timeRemaining;
    quizQuestions.appendChild(nPara2);
  }
  //Label input
  var newLabel = document.createElement("label");
  newLabel.setAttribute("id", "newLabel");
  newLabel.textContent = "Please enter your initials: ";

  quizQuestions.appendChild(newLabel);

  //data input
  var newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("id", "initials");
  newInput.textContent = "";

  quizQuestions.appendChild(newInput);

  //submit quiz
  var newSubmit = document.createElement("button");
  newSubmit.setAttribute("type", "submit");
  newSubmit.setAttribute("id", "submit");
  newSubmit.textContent = "Submit";

  quizQuestions.appendChild(newSubmit);

  //Creating an event listener for storing the data in the local storage
  newSubmit.addEventListener("click", function () {
    var initials = newInput.value;

    if (initials === null) {
      console.log("No value has been entered");
    } else {
      var totalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(totalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(totalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      //Links to the result page
      window.location.replace("./results.html");
    }
  });
}
