const add = (x, y) => {
  return x + y;
};

const subtract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  return x / y;
};

const percentage = (x, y, operator) => {
  if (y == null) return x / 100;
  else
    switch (operator) {
      case "add":
        return add(x, x / y);
        break;
      case "subtract":
        return subtract(x, x / y);
        break;
      case "multiply":
        return multiply(x, x / y);
        break;
      case "divide":
        if (y === 0) return null;
        else return divide(x, x / y);
        break;
      default:
        return null;
    }
};

const operate = function (x, y, operator) {
  switch (operator) {
    case "add":
      return add(x, y);
      break;
    case "subtract":
      return subtract(x, y);
      break;
    case "multiply":
      return multiply(x, y);
      break;
    case "divide":
      if (y === 0) return null;
      else return divide(x, y);
      break;
    case "percentage":
      return percentage(x, y, operator);
      break;
    default:
      return null;
  }
};

const output = document.getElementById("output");
const btnContainer = document.getElementsByTagName("button");
const digits = document.getElementsByClassName("digit");
const operators = Array.from(document.getElementsByClassName("operator"));
const paragraph = document.getElementById("screen");

let num1 = null;
let num2 = null;
let currentOperation = null;
let setDefault = false;

window.onload = function () {
  if (isEmpty(paragraph.innerHTML)) paragraph.innerHTML = "0";
};

const isEmpty = (str) => {
  return !str || 0 === str.length;
};

Array.prototype.forEach.call(digits, function (button) {
  button.addEventListener("click", function () {
    outputDefault();
    if (paragraph.innerHTML === "0") paragraph.innerHTML = "";
    if (paragraph.innerHTML.length >= 10) return;
    paragraph.innerHTML += button.value;
  });
});

const outputDefault = function () {
  if (setDefault == true) paragraph.innerHTML = "0";
  setDefault = false;
};

const reset = function () {
  num1 = null;
  num2 = null;
  currentOperation = null;
  setDefault = true;
  outputDefault();
  setDefault = false;
};

const resetNum = function () {
  num1 = null;
  num2 = null;
};

const clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  setDefault = true;
  outputDefault();
  setDefault = false;
  num2 = null;
});

const del = document.getElementById("del");
del.addEventListener("click", function () {
  paragraph.innerHTML = paragraph.innerHTML.slice(0, -1);
  if (paragraph.innerHTML === "") outputDefault();
});

operators.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.value));
});

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  num1 = parseInt(paragraph.innerHTML);
  console.log(num1);
  currentOperation = operator;
  console.log(operator);
  setDefault = true;
}

function evaluate() {
  num2 = parseInt(paragraph.innerHTML);
  console.table(num1, num2, currentOperation);
  if (num2 == 0 && currentOperation == "divide") {
    alert("You can't divide a number by 0!");
    num2 = 1;
  }
  let answer = operate(num1, num2, currentOperation);
  if (answer.toString().length >= 10) answer = answer.toExponential();
  paragraph.innerHTML = answer;
  answer = answer.toPrecision();
  if (answer == null) paragraph.innerHTML = "null";
  currentOperation = null;
  setDefault = true;
}

const equal = document.getElementById("equal");
equal.addEventListener("click", () => {
  evaluate();
});

const pctBtn = document.getElementById("percentage");
pctBtn.addEventListener("click", () => {
  if (num2 == null) {
    if (num1 !== null) {
      num2 = paragraph.innerHTML;
      paragraph.innerHTML = percentage(num1, num2, currentOperation);
      console.table(num1, num2, currentOperation);
      setDefault = true;
      resetNum();
    } else {
      num1 = paragraph.innerHTML;
      paragraph.innerHTML = percentage(num1, num2, currentOperation);
      setDefault = true;
      console.table(num1, num2, currentOperation);
    }
  } else {
    num2 = paragraph.innerHTML;
    paragraph.innerHTML = percentage(num1, num2, currentOperation);
    console.table(num1, num2, currentOperation);
    setDefault = true;
  }
});

const decBtn = document.getElementById("decimal");
decBtn.addEventListener("click", () => {
  outputDefault();
  if (paragraph.innerHTML.includes(".")) return;
  else paragraph.innerHTML += decBtn.value;
});
