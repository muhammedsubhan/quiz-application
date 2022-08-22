const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .exit-quiz");
const continueBtn = infoBox.querySelector(".buttons .continue");
const quizBox = document.querySelector(".quiz-box");
const optionList = document.querySelector(".option-list");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const timeLine = quizBox.querySelector("header .time-line");
const timeOff = quizBox.querySelector("header .time-text");
// Start Quiz Button

startBtn.onclick = () => {
  infoBox.classList.add("activeinfo");
};

// Exit Quiz
exitBtn.onclick = () => {
  infoBox.classList.remove("activeinfo");
};

// Continue button
continueBtn.onclick = () => {
  infoBox.classList.remove("activeinfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimeLine(0);
};

let que_Count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;
// Next Button
const nextBtn = quizBox.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .continue");
const quitQuiz = resultBox.querySelector(".buttons .exit-quiz");

quitQuiz.onclick = () => {
  window.location.reload();
}

restartQuiz.onclick = () => {
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");
  let que_Count = 0;
  let que_numb = 1;
  let timeValue = 15;
  let widthValue = 0;
  let userScore = 0;

  showQuestions(que_Count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimeLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time Left";
}

// If next Button Clicked
nextBtn.onclick = () => {
  if (que_Count < questions.length - 1) {
    que_Count++;
    que_numb++;
    showQuestions(que_Count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimeLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questions are completed");
    showResultBox();
  }
};

// getting questions and options from array
function showQuestions(index) {
  const que_Text = document.querySelector(".que-text");

  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  que_Text.innerHTML = que_tag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon =
  '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

// Option selected Answer

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[que_Count].answer;
  let allOptions = optionList.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    // If incorrect automatically selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAns) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  // once option is selected disabled all options

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.style.display = "block";
}

function showResultBox(){
  infoBox.classList.remove("activeinfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score-text");
  if(userScore > 3){
    let scoreTag = '<span>and Congrats! you got <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }

  else if(userScore > 1){
    let scoreTag = '<span>and Nice, you got <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }

  else {
    let scoreTag = '<span>and sorry, you got only<p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time;
      time--;
      if(time < 9){
        let addZero = timeCount.textContent;
        timeCount.textContent = "0" + addZero;
      }
      if(time < 0){
        clearInterval(counter);
        timeCount.textContent = '00';
        timeOff.textContent = "Time Off";

        let correctAns = questions[que_Count].answer;
        let allOptions = optionList.children.length;

        for (let i = 0; i < allOptions; i++) {
          if (optionList.children[i].textContent == correctAns) {
            optionList.children[i].setAttribute("class", "option correct");
            optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
          }
        }

        for (let i = 0; i < allOptions; i++) {
          optionList.children[i].classList.add("disabled");
        }
        nextBtn.style.display = "block";
      }
  }
}

function startTimeLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
    time += 1;
    timeLine.style.width = time + "px";
    if(time > 549){
       clearInterval(counterLine);
    }
  }
}


// bottom question counter
function queCounter(index) {
  const bottom_ques_counter = quizBox.querySelector(".total-que");
  let totalQuesCounterTag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";
  bottom_ques_counter.innerHTML = totalQuesCounterTag;
}
