let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let shouldClearScreen = false;

const numBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const calcScreen = document.querySelector('.screen');
const currentScreen = document.querySelector('.currentScreen');
const lastScreen = document.querySelector('.lastScreen'); 
const evaluate = document.querySelector('#equalsBtn');
const pointsBtn = document.querySelector('#pointsBtn');

function clearScreen() {
    currentScreen.textContent = '';
    shouldClearScreen = false;
}

function handleNumBtn() {
    num = this.dataset.number;
    if(currentScreen.textContent === '' || shouldClearScreen)
        clearScreen();
    currentScreen.textContent += num;
}


function handleOperator() {
    if(currentOperator !== '') handleEvaluate();
    firstOperand = currentScreen.textContent;
    currentOperator = this.textContent;
    lastScreen.textContent = `${firstOperand} ${currentOperator}`;
    clearScreen();

}

function multiply(num1, num2) {
    return num1 * num2
}

function add(num1, num2) {
    return (num1 * 1) + (num2 * 1)
}

function subtract(num1, num2) {
    return num1 - num2
}

function divide(num1, num2) {
    return num1 / num2
}

function handleClear() {
    lastScreen.textContent = '';
    currentScreen.textContent = '';
}

function roundResult(number) {
    return Math.round(number * 100) / 100
}

function handleDelete() {
    currentScreen.textContent = currentScreen.textContent
        .toString()
        .slice(0, -1)

}
function handleEvaluate() {

    if(currentOperator === '') return;
    secondOperand = currentScreen.textContent;
    if(currentOperator === '/' && secondOperand === '0') {
        alert('Cannot Divide by Zero!') 
        clearScreen()
        lastScreen.textContent = '';
        firstOperand = '';
        secondOperand = '';
        currentOperator = '';
        return;
    }
    currentScreen.textContent = roundResult(
        operate(currentOperator, firstOperand, secondOperand)
    );
    
    lastScreen.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    shouldClearScreen = true;
    currentOperator = '';
 
}

function operate(operator, num1, num2) {
    Math.floor(num1);
    Math.floor(num2);
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}


function handlePoint() {
    if(currentScreen.textContent === '0' || currentScreen.textContent === '') {
        currentScreen.textContent += '.'
    }
    if(currentScreen.textContent.includes('.')) {
        return
    }
    currentScreen.textContent += '.'

}

deleteBtn.addEventListener('click', handleDelete);
clearBtn.addEventListener('click', handleClear);
numBtns.forEach(numBtn => numBtn.addEventListener('click', handleNumBtn));
operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener('click', handleOperator));
pointsBtn.addEventListener('click', handlePoint);
evaluate.addEventListener('click', handleEvaluate);