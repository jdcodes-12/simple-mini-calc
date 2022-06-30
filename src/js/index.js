// Program Our Calc's Functionality (behavior)
class Calculator {

  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  // methods/functions
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.chooseOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    this.currentOperand = this.currentOperand.toString() +
                          number.toString();
  }

  chooseOperation(operation) {

    // If current op is empty, skip
    if (this.currentOperand === '') {
      return;
    }

    // If not empty string (something in bot), do computation
    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    
    // get values
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // Cancel computation if NaN
    if ( isNaN(prev) || isNaN(current) ) {
      return;
    }

    switch( this.operation ) {
      case '+': 
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default: 
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    return number;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand);

    // display operation symbol in display
    if(this.operation != null){
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }
  }
}

// Select Buttons on Calculator
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-prev-op]');
const currentOperandTextElement = document.querySelector('[data-cur-op]');

// create a calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Give Number Keys Functionality
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Give Operation Keys Functionality
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Give Equals Button Functionality
equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

// Give AC Button Functionality
allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});