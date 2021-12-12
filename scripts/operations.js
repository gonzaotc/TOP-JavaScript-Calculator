const inputScreen = document.querySelector(".screen__input");
const inputError = document.querySelector(".screen__error");
const timeScreen = document.querySelector(".screen__time");
const outputScreen = document.querySelector(".screen__output");

// ----- OPERATIONS ----- //
const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    if (b === 0) {
        printError("Cannot divide by zero.");
        return "Math Error";
    }
    return a / b;
};

// ----- OPERATE ----- //
const operate = (operator, a, b) => {
    return operator(+a, +b);
};

// ---- PRINT OUTPUT ---- //
export const printOutput = output => {
    outputScreen.innerHTML = output;
};

// ---- PROCESS OPERATION ---- //
const processOperation = (array, operation, opSymbol) => {
    let opIndex = array.indexOf(opSymbol);

    let toOperate = array.splice(opIndex - 1, 3, "result");
    // toOperate: [a, operation, b]
    console.log("toOperate:", toOperate);
    console.log("rest:", array);

    let result = operate(operation, toOperate[0], toOperate[2]);
    console.log("result:", result);
    if (result === "Math Error") {
        return "Math Error";
    }

    let resultIndex = array.indexOf("result");
    array.splice(resultIndex, 1, result.toString());
    console.log("new array:", array);
    return array;
};

// ---- PROCESS ARRAY ---- //
export const processArray = array => {
    let operationString = array.join("");
    console.log('Operation string:', operationString);
    let operationArray = operationString.split(" ");
    console.log("Operation:", operationArray);

    while (array.length > 1 && array !== "Math Error") {
        if (array.includes("*")) array = processOperation(operationArray, multiply, "*");
        else if (array.includes("/")) array = processOperation(operationArray, divide, "/");
        else if (array.includes("-")) array = processOperation(operationArray, subtract, "-");
        else if (array.includes("+")) array = processOperation(operationArray, add, "+");
    }

    console.log("final result:", array);
    if (array == "Math Error") {
        printOutput(array);
    } else {
        printOutput(Math.round(array * 100) / 100);
    }
};

// ---- POPULATE ---- //
export const populate = (array, value) => {
    if (value) { // if a value is passed, is added to the array.
        array.push(value);
    }
    if (array) { // if a array is passed, is printed into the input screen.
        inputScreen.innerText = `${array.join("")}`;
    } else inputScreen.innerText = "0"; // if no argument is passed, input screen gets clean.
};

// ---- PRINT ERROR ---- //
export const printError = error => {
    inputError.innerText = error;
    setTimeout(() => {
        inputError.innerText = "";
    }, 2000);
};

// ---- IS NUMBER ---- //
export const isNumber = argument => {
    return /[0-9]/.test(argument);
};

// ---- DELETE ---- //
export const deleteLast = array => {
    let lastArgument = array[array.length - 1];
    if (isNumber(lastArgument)) {
        return array.slice(0, array.length - 1);
        // Note: slice(a,b) includes a and does not include b.
    } else {
        return array.slice(0, array.length - 3);
    }
};

// ---- GET HOUR ---- //
export const getTime = () => { 
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour > 12) hour = hour - 12;
    if (minute < 10) minute = '0' + minute;
    timeScreen.innerHTML = `${hour}:${minute}`;
}