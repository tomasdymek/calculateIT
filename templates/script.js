
  var display = "";
  var lastClicked = "";
  var isOperatorClicked = false;
  var lastResult = null;

  function handleClick(value) {
    if (value === "=") {
      calculateResult();
    } else if (value === "C") {
      clearDisplay();
    } else if (value === "Backspace" || value === "Delete") {
      if (display.length > 0) {
        display = display.slice(0, -1);
        if (isOperator(value)) {
          isOperatorClicked = false;
        }
      }
    } else {
      if (canAddValue(value)) {
        display += value;
        if (isOperator(value)) {
          isOperatorClicked = true;
        } else {
          isOperatorClicked = false;
        }
      }
    }

    lastClicked = value;
    updateDisplay();
  }

  function canAddValue(value) {
    if (display.length === 0 && isOperator(value)) {
      return false;
    }

    if (isOperatorClicked && isOperator(value)) {
      return false;
    }

    return true;
  }

  function isOperator(value) {
    return /[+\-*/%]/.test(value);
  }

  function updateDisplay() {
    var displayElement = document.getElementById("result");
    displayElement.innerText = display;
  }

  function calculateResult() {
    try {
      var result = eval(display);

      if (lastResult !== null && lastClicked === "=") {
        result = eval(lastResult + lastClicked + result);
      }

      lastResult = result;
      display = result.toString();
    } catch (error) {
      display = "";
    }

    updateDisplay();
  }

  function clearDisplay() {
    display = "";
    isOperatorClicked = false;
    lastClicked = "C";
    lastResult = null;
    updateDisplay();
  }

  function highlightButton(key) {
    var button = document.querySelector(`td[onclick="handleClick('${key}')"]`);

    if (button) {
      button.classList.add("highlight");

      setTimeout(function () {
        button.classList.remove("highlight");
      }, 200);
    }
  }

  document.addEventListener("keydown", function (event) {
    var key = event.key;

    if (/[0-9]|\.|\+|\-|\*|%|\//.test(key)) {
      if (key === ",") key = ".";
      handleClick(key);
      highlightButton(key);
    } else if (key === "Enter") {
      handleClick("=");
      highlightButton("=");
    } else if (key === "Escape" || key === "Delete") {
      handleClick("C");
      highlightButton("C");
    } else if (key === "Backspace") {
      handleClick("Backspace");
      highlightButton("Backspace");
    }
  });
