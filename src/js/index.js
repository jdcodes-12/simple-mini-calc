/* 
  Follow Steps in Order:
    1. Select Buttons on calculator UI via data attributed
    2. Create `Calculator` class to code calculator logic (Constructor + all functions .. will be blank implementation)
    3. Create a new `Calculator` object - enable us to use `Calculator` class
    4. Add event listerners to number keys
    5. Edit `UpdateDisplay`
    6. Edit `AppendNumber(number)`
    7. Add event listerns to operation keys
    8. Edit `chooseOperation(operation)`
    9. Add to `UpdateDisplay`
    10. Edit `chooseOperation(operation)
    11. Add Equals Button Event Listener
    12. Edit `compute()`
    13. Add All Clear Button Event Listener
    14. Edit `delete()`
    15. Add Delete Button Event Listener
    16. Edit `UpdateDisplay()`
    17. Edit `getDisplayNumber()`
    18. Edit `UpdateDisplay()`

*/

/**  (1) Select Buttons On Calculator via data attributes**/
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation'); 
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOpTextElement = document.querySelector('[data-prev-op]');
const currOpTextElement = document.querySelector('[data-cur-op]');


/** (2) Create Class for Calculator functionality - "The Logic" of the Calculator **/
class Calculator {

  // Run this on setup - put new calculator objects in intial state
  constructor(prevOpTextElement, currOpTextElement) {
    this.prevOpTextElement = prevOpTextElement;
    this.currOpTextElement = currOpTextElement;
    this.clear(); 
  }

  // clear all entered numbers
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // Remove one digit off curr number
  delete() {

     // (14) 
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // display selected number on the calc
  appendNumber(number) {

    // (6) Stop if multiple '.' are clicked. Limits to 1 in window. 
    if( number === '.' && this.currentOperand.includes('.') ) {
      return;
    }

    // (6) display new number in screen @ end
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // (8) Chooose operation, clear the window display, 
  //     and put into the prevOp slot in window
  chooseOperation(operation) {

    // (10) If no op selected, return 
    if ( this.currentOperand === '' ) {
      return;
    }

    // (10) compute a value if there are operands
    if ( this.previousOperand !== '' ) {
      this.compute(); 
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // compute a single value in window
  compute() {

    // (12) add code logic
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    
    // Check to see there are numbers in prev & cur before
    // doing calculation
    if ( isNaN(prev) && isNaN(current) ) {
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

  // Work with Decimal Numbers
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]); // get numbers
    const decimalDigits = stringNumber.split('.')[1];  // get decimal 
    let integerDisplay;

    // return if NaN on intg
    if ( isNaN(integerDigits) ) {
      integerDisplay = ''
    } 

    // else convert integer display
    else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }

    // Check for decimal digits, non-null means a decimal numer was entered
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } 

    else {
      return integerDisplay;
    }
  }

  // update calc window display
  updateDisplay() {

    this.currOpTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.prevOpTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } 

    // (18) edit formatting for prev op
    else {
      this.prevOpTextElement.innerText = ''
    }
  }
}

// (3) Create new Calc Object 
const calculator = new Calculator(prevOpTextElement, currOpTextElement);


/** Give buttons functionality via event listeners **/

// (4) Functionality: Show number values in display window (e.g. 0-9 & '.')
numberButtons.forEach( button => {

  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });

});

// (7) Functionality: Select the right operation to use
operationButtons.forEach( button => {

  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });

});

// (11) Functionality: Equals Button
equalsButton.addEventListener('click', button => {

  calculator.compute();
  calculator.updateDisplay();

});

// (13) Functionality: clear window
allClearButton.addEventListener('click', button => {

  calculator.clear();
  calculator.updateDisplay();

});

// (15) Functionality: delete 1 # from current window
deleteButton.addEventListener('click', button => {

  calculator.delete();
  calculator.updateDisplay();

});