document.addEventListener("DOMContentLoaded", () => {

    // Keeps track of the current operand
    let currOperand = '';
    // Keeps track of the previous operand
    let prevOperand = '';
    // Keeps track of the current operation
    let operation = undefined;

    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('[data-number');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButtons = document.querySelectorAll('[data-equals]');
    const clearButton = document.querySelector('[data-clear]');
    const prevOperandText = document.querySelector('[data-prev-operand]');
    const currOperandText = document.querySelector('[data-curr-operand]');

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.innerText);
            updateDisplay();
        });
    });


    function selectionOperation() {

    }

    function appendNumber(num) {
        tempOperand = currOperand;

        // Update current operand
        currOperand = tempOperand.toString() + num.toString();
    }

    function clear() {
        currOperand = '';
        prevOperand = '';
        operation = undefined;
    }

    function compute() {

    }

    function updateDisplay() {
        currOperandText.innerText = currOperand;
        // prevOperandText.innerText = prevOperand;
    }

}); 