// Append value to the display
function appendValue(value) {
    const resultInput = document.getElementById('result');
    resultInput.value += value;
  }
  
  // Clear the display
  function clearResult() {
    const resultInput = document.getElementById('result');
    resultInput.value = '';
  }
  
  // Delete the last character
  function backspace() {
    const resultInput = document.getElementById('result');
    resultInput.value = resultInput.value.slice(0, -1);
  }
  
  // Calculate the expression
  function calculate() {
    const resultInput = document.getElementById('result');
    const expression = resultInput.value;
  
    try {
      const result = evaluateExpression(expression);
      resultInput.value = result;
    } catch (error) {
      alert('Invalid Expression');
    }
  }
  
  // Evaluate mathematical expression manually
  function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    const numbers = [];
    const ops = [];
  
    let num = '';
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (!isNaN(char) || char === '.') {
        num += char;
      } else if (operators.includes(char)) {
        if (num === '') throw new Error('Invalid Expression');
        numbers.push(parseFloat(num));
        num = '';
        while (ops.length && precedence(ops[ops.length - 1]) >= precedence(char)) {
          processOperation(numbers, ops);
        }
        ops.push(char);
      }
    }
  
    if (num !== '') {
      numbers.push(parseFloat(num));
    }
  
    while (ops.length) {
      processOperation(numbers, ops);
    }
  
    if (numbers.length !== 1) throw new Error('Invalid Expression');
    return numbers[0];
  }
  
  // Determine precedence of operators
  function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
  }
  
  // Process a single operation
  function processOperation(numbers, ops) {
    if (numbers.length < 2 || ops.length === 0) {
      throw new Error('Invalid Expression');
    }
    const b = numbers.pop();
    const a = numbers.pop();
    const op = ops.pop();
  
    let result;
    switch (op) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        if (b === 0) throw new Error('Division by zero');
        result = a / b;
        break;
      default:
        throw new Error('Unknown operator');
    }
    numbers.push(result);
  }
  