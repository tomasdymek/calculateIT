let result = document.getElementById('result');
let lastValue = '';
let expression = '';

function appendValue(value) {
  expression += value;
  result.textContent = expression;
}

function clearResult() {
  expression = '';
  result.textContent = '';
}

function deleteLastValue() {
  expression = expression.slice(0, -1);
  result.textContent = expression;
}

function evaluate() {
  try {
    const evaluation = eval(expression);
    expression = evaluation.toString();
    result.textContent = expression;
  } catch (error) {
    clearResult();
    console.error('Invalid expression');
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const validKeys = /^[0-9\/\*\-\+\.\n=]$/.test(key);

  if (validKeys) {
    const button = document.querySelector(`td:contains('${key}')`);
    if (button) {
      button.classList.add('active');
      setTimeout(() => {
        button.classList.remove('active');
      }, 100);
    }
  }

  if (key === 'Enter' || key === '=') {
    evaluate();
  }
});
