const currentOpperand = document.querySelector('.current-operand');
const previousOpperand = document.querySelector('.previous-operand');
const removeOne = document.querySelector('.c');
const removeAll = document.querySelector('.ac');
const numbersButtons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
let operation = '';

numbersButtons.forEach(number => {
    number.addEventListener('click', () => {
        if (number.value === '.' && currentOpperand.value.includes('.')) return
        if (!currentOpperand.value.includes('=')) {
            currentOpperand.value += number.value;
        }
    });
});

removeOne.addEventListener('click', ()=> {
    if (currentOpperand.value.includes('=')) return
    currentOpperand.value = currentOpperand.value.slice(0, -1);
});

removeAll.addEventListener('click', ()=> {
    currentOpperand.value = '';
    previousOpperand.value = '';
    operation = '';
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (previousOpperand.value === '' && currentOpperand.value === '') return
        if (operation === '') {
        previousOpperand.value = `${currentOpperand.value}${operator.value}`;
        currentOpperand.value = '';
        operation = operator.value;
        } else if (currentOpperand.value.includes('=') && previousOpperand.value.includes(operation)) {
            operation = operator.value;
            previousOpperand.value = `${currentOpperand.value.slice(2)}${operator.value}`;
            currentOpperand.value = '';
        }else {
            calculate();
            operation = operator.value;
            previousOpperand.value = `${currentOpperand.value}${operator.value}`;
            currentOpperand.value = '';
        };
    });
});

equal.addEventListener('click', ()=> {
    if (currentOpperand.value.includes('=')) return
    if (currentOpperand.value !== '' && previousOpperand.value !== '') {
    calculate();
    currentOpperand.value = `= ${currentOpperand.value}`;
    }
});

const calculate = () =>{
    const num1 = parseFloat(previousOpperand.value);
    const num2 = parseFloat(currentOpperand.value);
    const operator = operation;
    switch (operator) {
        case '+':
            previousOpperand.value = `${num1}${operation}${num2}`;
            currentOpperand.value = `${num1+num2}`
            break;
        case '-':
            previousOpperand.value = `${num1}${operation}${num2}`;
            currentOpperand.value = `${num1-num2}`
            break;
        case '/':
            previousOpperand.value = `${num1}${operation}${num2}`;
            currentOpperand.value = `${num1 / num2}`
            break;
        case '*':
            previousOpperand.value = `${num1}${operation}${num2}`;
            currentOpperand.value = `${num1*num2}`
            break;
    };
};