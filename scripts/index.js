import {
    populate,
    printError,
    printOutput,
    deleteLast,
    isNumber,
    processArray,
    getTime,
} from "./operations.js";

const timeScreen = document.querySelector(".screen__time");
const outputScreen = document.querySelector(".screen__output");
const inputScreen = document.querySelector(".screen__input");
const inputError = document.querySelector(".screen__error");

// ----- buttons ----- //
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const zero = document.querySelector("#zero");

const sum = document.querySelector("#sum");
const sub = document.querySelector("#sub");
const mult = document.querySelector("#mult");
const div = document.querySelector("#div");
// const power = document.querySelector("#power");
// const factorial = document.querySelector("#factorial");

const point = document.querySelector("#point");
const del = document.querySelector("#del");
const ac = document.querySelector("#ac");
const equal = document.querySelector("#equal");
// ----- end of buttons ----- //

let currentOperation = [];
const numberButtons = [zero, one, two, three, four, five, six, seven, eight, nine];
const basicOperationButtons = [sum, sub, mult, div];
// const complexOperationButtons = [power, factorial];

numberButtons.forEach(element => {
    element.addEventListener("click", () => {
        populate(currentOperation, element.innerText);
        console.log(currentOperation);
    });
});

basicOperationButtons.forEach(element => {
    element.addEventListener("click", () => {
        let lastArgument = currentOperation[currentOperation.length - 1];
        if (currentOperation.length < 1) {
            // If there is no numbers
            printError("Needs a number to operate.");
        } else if (!isNumber(lastArgument)) {
            // If the last argument is not a number
            printError("use only one operation at a time");
        } else {
            populate(currentOperation, " ");
            populate(currentOperation, element.innerText);
            populate(currentOperation, " ");
        }
    });
});


point.addEventListener("click", () => {
    populate(currentOperation, '.');
});


del.addEventListener("click", () => {
    if (inputScreen.innerText !== "0") {
        currentOperation = deleteLast(currentOperation);
        if (currentOperation.length > 0) {
            populate(currentOperation);
        } else {
            populate();
        }
    }
});

ac.addEventListener("click", () => {
    if (currentOperation.length > 1) {
        currentOperation = [];
        populate();
        printOutput("0");
    }
});

equal.addEventListener("click", () => {
    let lastArgument = currentOperation[currentOperation.length - 1];
    if (currentOperation.length === 0) return;
    if (!isNumber(lastArgument)) {
        printError("Last argument must be a number");
    } else if (currentOperation.every(element => isNumber(element))) {
        // Si solo se escribieron numeros -> mostrar números
        printOutput(currentOperation.join(""));
    } else {
        processArray(currentOperation);
    }
});

window.setInterval(getTime(), 60000);


