
const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("newQuestionCard");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const subject = document.getElementById("subject");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("newFlashcardBtn");
const closeButton = document.getElementById("closeButton");
let editBool = false;
var numberOfCards = 0;

//Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  subject.value = "";
  addQuestionCard.classList.remove("hide");
});

//Close the new flashcard con
closeButton.addEventListener(
  "click",
  (hideQuestion = () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);

//Submit Question
cardButton.addEventListener(
  "click",
  (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
      errorMessage.classList.remove("hide");
    } else {
      container.classList.remove("hide");
      errorMessage.classList.add("hide");
      viewlist();
      subject.value = "";
      question.value = "";
      answer.value = "";
      numberOfCards++;
    }
  })
);

//Card Generate
function viewlist() {
  var listCard = document.getElementsByClassName("cardsContainer");
  //create a div for flip card
  var div = document.createElement("div");
  div.classList.add("flip-card");
  div.classList.add("filterDiv");
  div.classList.add("show");
  if (subject.value != "") {
    div.classList.add(subject.value);
  }
  
  //add the nesting classes within flip card
  div.innerHTML += '<div class="flip-card-inner"><div class="flip-card-front"><p></p></div><div class="flip-card-back"></div></div>';
  var flipCardFront = div.getElementsByClassName("flip-card-front")[0];
  var flipCardBack = div.getElementsByClassName("flip-card-back")[0];

  //assign the question and answer values to a paragraph element
  var showQuestion = document.createElement("p");
  showQuestion.innerText = question.value;
  
  var showAnswer = document.createElement("p");
  showAnswer.innerText = answer.value;
  
  //add paragraph elements w/ values to the flashcard
  flipCardFront.appendChild(showQuestion);
  flipCardBack.appendChild(showAnswer);


  //Edit button
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  var editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);
  disableButtons(false);

  //Delete Button
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard[0].appendChild(div);
  hideQuestion();
}

//Modify Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    let parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }
  parentDiv.remove();
};

//Disable edit and delete buttons
const disableButtons = (value) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
  
};

//filter
filterSelection("all")
debugger
function filterSelection(c) {
  var allCards, i;

  allCards = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < allCards.length; i++) {
    w3RemoveClass(allCards[i], "show");
    if (allCards[i].className.indexOf(c) > -1) w3AddClass(allCards[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  if (!element.classList.contains(name)) {
    element.classList.add(name);
  }
  
  /*
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
  */
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  element.classList.remove(name);
  /*
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
  */
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("tab");
var btns = btnContainer.getElementsByClassName("tabLinks");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}