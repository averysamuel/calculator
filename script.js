
function add(a,b){
    return (Math.round(((a+b)+ Number.EPSILON) * 10000000000) / 10000000000).toString().substring(0,15);
}

function subtract(a,b){
    return (Math.round(((a-b)+ Number.EPSILON) * 10000000000) / 10000000000).toString().substring(0,15);
}

function multiply(a,b){
    return (Math.round(((a*b)+ Number.EPSILON) * 10000000000) / 10000000000).toString().substring(0,15);
}

function divide(a,b){
    return (b === 0)? 'come on son': (Math.round(((a/b) + Number.EPSILON) * 10000000000) / 10000000000).toString().substring(0,15);
}

function operate(operator,a,b){
    if(operator === '+'){return add(a,b)};
    if(operator === '-'){return subtract(a,b)};
    if(operator === '/'){return divide(a,b)};
    if(operator === 'x'){return multiply(a,b)};
}
const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display');
let displayValue; //store input for computations
let firstInput; //boolean value to track whether int1 is populated
let int1;
let int2;
let isNegative;
let displayIntCount = 1;

//connect keyboard
document.addEventListener('keydown',(e) =>{
    if((e.key >= '0' && e.key <= '9')|| e.key === '.'){
        inputNumber(e.key)
    }else if (e.key === '+'){
        operator = e.key
        inputOperator(document.querySelector(`.fn.add`));
    }else if(e.key ==='*'){
        operator = 'x'
        inputOperator(document.querySelector(`.fn.multiply`));
    }else if(e.key === '-'){
        operator = e.key
        inputOperator(document.querySelector(`.fn.subtract`));
    }else if(e.key === '/'){
        operator = e.key
        inputOperator(document.querySelector(`.fn.divide`));
    }else if(e.key === 'Enter'){
        equals();
    }else if(e.key === 'Backspace'){
        backspace();
    }
});

function backspace(){
    if(display.textContent === '0'){
        display.textContent = '0';
    }else{
    display.textContent = display.textContent.slice(0,-1);
    }
}
//show user input on calculator screen
const decimal = document.querySelector('.number.decimal');

numbers.forEach((number) => {
    number.addEventListener('click',()=> {
        inputNumber(number.textContent)
    })
})

function inputNumber(num){
        if(display.textContent === '0'){
            clearDisplay();
        }
        if(display.textContent.includes('.') || num === '.'){ //only allow for a decimal to input once
            decimal.disabled = true;
        }
        if(firstInput && display.textContent!= '-'){
            clearDisplay(); 
        }
        removeHighlight();
        if(displayIntCount <=10){
        display.textContent += num;
        displayIntCount ++;
        displayValue = display.textContent;
        //console.log(this)
        }
        firstInput = false;
        document.querySelector('.fn.delete').disabled = false;
}
function removeHighlight(){
    if(!!document.querySelector('.fn.white')){
        const currFn = document.querySelector('.fn.white');
            currFn.removeAttribute('style')
            currFn.classList.remove('white')
    }
}
function clearDisplay(){
    display.textContent ='';
}

//Clear Button - erase screen and get rid of any stored values 
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click',() => {
    displayValue = '';
    display.textContent = 0;
    decimal.disabled = false;
    int1 = '';
    int2 = '';
    if(document.querySelector('.fn.disabled')){
    const fnBtn = document.querySelector('.fn.disabled')
    fnBtn.classList.remove('disabled')
    fnBtn.disabled = false;
    displayIntCount = 1;
    }
    removeHighlight();
    numbers.forEach(num => num.disabled = false);
    document.querySelector('.fn.delete').disabled = false;
});

//Fn button(operators) - erase screen and store selected operation
const fnBtns = document.querySelectorAll('.fn');
let operator;
fnBtns.forEach((fnBtn) => {
    //fnBtn.addEventListener('click',() => display.textContent = displayValue);
    fnBtn.addEventListener('click', () => {
        if(fnBtn.textContent != 'Del'){
        displayValue = display.textContent
        operator = fnBtn.textContent
        inputOperator(fnBtn);
        }
        else if(fnBtn.textContent === 'Del'){
            backspace();
        }
    })
})

function inputOperator(o) {
        numbers.forEach(num => num.disabled = false);
        document.querySelector('.fn.delete').disabled = false;
        firstInput = true;
        int1 = displayValue;
        if(document.querySelector('.fn.disabled')){
            const operatorBtn = document.querySelector('.fn.disabled')
            operatorBtn.classList.remove('disabled')
            operatorBtn.disabled = false;
        }
        o.classList.toggle('disabled');
        o.disabled = true;
        decimal.disabled = false;
        int2 = int1;
        removeHighlight();
        o.style.backgroundColor = 'white';
        o.classList.add('white');
        displayIntCount =1;
}

//Equals button runs calculation
const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click',equals)

function equals(){
    if(display.textContent === '0'){
        display.textContent = '0';
    }else{
    displayIntCount = 1;
    clearDisplay()
    int2 = displayValue
    calculate()
    removeHighlight()
    numbers.forEach(num => num.disabled = true);
    document.querySelector('.fn.delete').disabled = true;
    }
}



function calculate(){
    int1 = parseFloat(int1);
    int2 = parseFloat(int2);
    if(isNaN(int1)){
        display.textContent = 0;
    }else if(int2 === 'undefined'){
       display.textContent = int1;
    }else{
        displayValue = operate(operator,int1,int2);
        display.textContent = displayValue;
    }
    if(document.querySelector('.fn.disabled')){
    const fnBtn = document.querySelector('.fn.disabled')
    fnBtn.classList.toggle('disabled')
    fnBtn.disabled = false;
}
}

document.querySelector('.negative').addEventListener('click',() =>{
if(display.textContent === '0'){
    display.textContent = '-'
    firstInput = false;
}else if(display.textContent === '-'){
    display.textContent = '0';
}else{
    const neg = parseFloat(display.textContent)*-1
    display.textContent = `${neg}`;
}
})