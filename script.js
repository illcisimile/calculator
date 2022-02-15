let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);
const pointButton = document.getElementById("pointBtn");
const equalsButton = document.getElementById("equalsBtn");

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);
equalsButton.addEventListener("click", evaluate);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  currentOperationScreen.textContent += number;
}

function appendPoint() {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (currentOperationScreen.textContent === "") {
    currentOperationScreen.textContent = "0";
  }
  if (currentOperationScreen.textContent.includes(".")) {
    return;
  }
  currentOperationScreen.textContent += ".";
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

function setOperation(operator) {
  if (currentOperation !== null) {
    evaluate();
  }
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function clear() {
  lastOperationScreen.textContent = "";
  currentOperationScreen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) {
    return;
  }
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You cannot divide by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}
