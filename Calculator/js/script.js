document.addEventListener('DOMContentLoaded', function() {
    const calculator = {
        currentOperand: '0',
        previousOperand: '',
        operation: undefined,
        reset: false
    };

    const currentOperandElement = document.getElementById('currentOperand');
    const previousOperandElement = document.getElementById('previousOperand');
    const numberButtons = document.querySelectorAll('.number');
    const operationButtons = document.querySelectorAll('.operator');
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('delete');
    const themeToggle = document.getElementById('themeToggle');

    // Initialize the calculator
    function init() {
        updateDisplay();
        
        // Number buttons
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                appendNumber(button.textContent);
                updateDisplay();
            });
        });
        
        // Operation buttons
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                chooseOperation(button.textContent);
                updateDisplay();
            });
        });
        
        // Equals button
        equalsButton.addEventListener('click', () => {
            compute();
            updateDisplay();
        });
        
        // Clear button
        clearButton.addEventListener('click', () => {
            clear();
            updateDisplay();
        });
        
        // Delete button
        deleteButton.addEventListener('click', () => {
            deleteNumber();
            updateDisplay();
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Keyboard support
        document.addEventListener('keydown', handleKeyboardInput);
    }

    // Append number to current operand
    function appendNumber(number) {
        if (calculator.reset) {
            calculator.currentOperand = '';
            calculator.reset = false;
        }
        
        if (number === '.' && calculator.currentOperand.includes('.')) return;
        if (calculator.currentOperand === '0' && number !== '.') {
            calculator.currentOperand = number;
        } else {
            calculator.currentOperand += number;
        }
    }

    // Choose operation
    function chooseOperation(operation) {
        if (calculator.currentOperand === '') return;
        if (calculator.previousOperand !== '') {
            compute();
        }
        
        calculator.operation = operation;
        calculator.previousOperand = calculator.currentOperand;
        calculator.currentOperand = '';
    }

    // Compute the result
    function compute() {
        let computation;
        const prev = parseFloat(calculator.previousOperand);
        const current = parseFloat(calculator.currentOperand);
        
        
        
        switch (calculator.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Division by zero is not allowed!");
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        calculator.currentOperand = computation.toString();
        calculator.operation = undefined;
        calculator.previousOperand = '';
        calculator.reset = true;
    }

    // Update the display
    function updateDisplay() {
        currentOperandElement.textContent = calculator.currentOperand;
        
        if (calculator.operation) {
            previousOperandElement.textContent = 
                `${calculator.previousOperand} ${calculator.operation}`;
        } else {
            previousOperandElement.textContent = '';
        }
    }

    // Clear the calculator
    function clear() {
        calculator.currentOperand = '0';
        calculator.previousOperand = '';
        calculator.operation = undefined;
    }

    // Delete the last number
    function deleteNumber() {
        if (calculator.currentOperand.length === 1 || 
            (calculator.currentOperand.length === 2 && calculator.currentOperand.startsWith('-'))) {
            calculator.currentOperand = '0';
        } else {
            calculator.currentOperand = calculator.currentOperand.slice(0, -1);
        }
    }

    // Toggle between dark and light theme
    function toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Handle keyboard input
    function handleKeyboardInput(e) {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            appendNumber(e.key);
            updateDisplay();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            let operation;
            switch (e.key) {
                case '+': operation = '+'; break;
                case '-': operation = '−'; break;
                case '*': operation = '×'; break;
                case '/': operation = '÷'; break;
            }
            chooseOperation(operation);
            updateDisplay();
        } else if (e.key === 'Enter' || e.key === '=') {
            compute();
            updateDisplay();
        } else if (e.key === 'Escape') {
            clear();
            updateDisplay();
        } else if (e.key === 'Backspace') {
            deleteNumber();
            updateDisplay();
        }
    }

    // Initialize the calculator
    init();
});