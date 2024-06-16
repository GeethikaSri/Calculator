let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let squareFlag = false;
let operators = ['+', '-', '*', '/', '%'];
let lastCharIsOperator = false;

// Mapping of keyboard keys to their corresponding calculator button values
const keyMap = {
    'Enter': '=',   // Enter key corresponds to '='
    'Escape': 'AC', // Escape key corresponds to 'AC'
    'Backspace': 'Del' // Backspace key corresponds to 'Del'
};

// Add event listener for keydown events on the document
document.addEventListener('keydown', function(event) {
    let key = event.key;

    // Check if the pressed key is mapped to a calculator button
    if (keyMap.hasOwnProperty(key)) {
        event.preventDefault(); // Prevent default behavior (like form submission)

        // Find the corresponding button and trigger a click event
        let buttonContent = keyMap[key];
        let targetButton = Array.from(buttons).find(button => button.textContent === buttonContent);
        
        if (targetButton) {
            targetButton.click(); // Simulate a click on the corresponding button
        }
    } else if (!isNaN(key) || operators.includes(key) || key === '.') {
        // Allow numeric keys, operators, and decimal point directly
        event.preventDefault(); // Prevent typing into the input box directly

        // Handle numeric input and operators
        if (operators.includes(key)) {
            if (lastCharIsOperator) {
                string = string.slice(0, -1);
            }
            lastCharIsOperator = true;
        } else {
            lastCharIsOperator = false;
        }
        string += key;
        input.value = string;
    }
});

// Add click event listeners to each calculator button
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonContent = e.target.innerHTML;

        if (buttonContent === '=') {
            // Handle calculation
            if (squareFlag) {
                string = Math.pow(eval(string), 2).toString();
                squareFlag = false;
            } else {
                try {
                    let result = eval(string).toString();
                    string += " = " + result;
                } catch (error) {
                    string = "Error";
                }
            }
            input.value = string;
            lastCharIsOperator = false;
            string = ""; // Clear the string after showing result
        } else if (buttonContent === 'AC') {
            // Handle clear all
            string = "";
            input.value = string;
            lastCharIsOperator = false;
        } else if (buttonContent === 'Del') {
            // Handle delete last character
            string = string.slice(0, -1);
            input.value = string;
            lastCharIsOperator = operators.includes(string[string.length - 1]);
        } else if (buttonContent === 'n²') {
            // Handle square operation
            squareFlag = true;
            input.value += '^2';
        } else {
            // Handle other button presses
            if (operators.includes(buttonContent)) {
                if (lastCharIsOperator) {
                    string = string.slice(0, -1);
                }
                lastCharIsOperator = true;
            } else {
                lastCharIsOperator = false;
            }
            string += buttonContent;
            input.value = string;
        }

        // Scroll the input box to the rightmost position
        input.scrollLeft = input.scrollWidth;
    });
});
