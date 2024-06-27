document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let shouldResetDisplay = false;

    buttons.map(button => {
        button.addEventListener('click', function (e) {
            const value = e.target.id;

            if (value === 'clear') {
                resetCalculator();
            } else if (value === 'equals') {
                calculateResult();
            } else if (isOperator(value)) {
                handleOperator(value);
            } else {
                handleNumber(value);
            }
        });
    });

    function resetCalculator() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        shouldResetDisplay = false;
        display.innerText = '0';
    }

    function calculateResult() {
        if (firstOperand === null || operator === null) return;

        let secondOperand = parseFloat(currentInput);
        let result = performCalculation(firstOperand, secondOperand, operator);

        display.innerText = result;
        currentInput = result.toString();
        firstOperand = null;
        operator = null;
    }

    function handleOperator(value) {
        if (currentInput === '') return;

        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            calculateResult();
            firstOperand = parseFloat(currentInput);
        }

        operator = value;
        shouldResetDisplay = true;
    }

    function handleNumber(value) {
        if (shouldResetDisplay) {
            currentInput = value;
            shouldResetDisplay = false;
        } else {
            currentInput += value;
        }

        display.innerText = currentInput;
    }

    function isOperator(value) {
        return ['add', 'subtract', 'multiply', 'divide'].includes(value);
    }

    function performCalculation(a, b, operator) {
        switch (operator) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                return a / b;
            default:
                return b;
        }
    }
});