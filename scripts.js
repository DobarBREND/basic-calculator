class Calculator {
    constructor(previousNumberTextElement, currentNumberTextElement) {
    this.previousNumberTextElement = previousNumberTextElement
    this.currentNumberTextElement = currentNumberTextElement
    this.clear()
    }


clear() {
    this.currentNumber = ""
    this.previousNumber = ""
    this.operation = undefined
    }

delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }

addNewNumber(number) {
    if(number === "." && this.currentNumber.includes("."))
        return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

pickOperator(operation) {
    if(this.currentNumber === "") return
    if(this.previousNumber !== "") {
        this.doMath()
    }
    this.operation = operation
    this.previousNumber = this.currentNumber
    this.currentNumber = ""
    }

doMath() {
    let mathOperation
    const previous = parseFloat(this.previousNumber)
    const current = parseFloat(this.currentNumber)
    if(isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
        case "+":
            mathOperation = previous + current
            break;
        case "-":
            mathOperation = previous - current
            break;
        case "*":
            mathOperation = previous * current
            break;
        case "/":
            mathOperation = previous / current
            break;
        case "mod":
            mathOperation = previous % current
            break;
        case "%":
            mathOperation = (previous / 100) * current
            break;
        case "xy":
            mathOperation = previous ** current
            break;
        case "y√x":
            mathOperation = Math.pow(previous, 1 / current)
            break;
        default:
            return
        }
        this.currentNumber = mathOperation
        this.operation = undefined
        this.previousNumber = ""
    }

getDivider(number) {
    const stringNumber = number.toString()
    const intNumber = parseFloat(stringNumber.split(".")[0])
    const decNumber = stringNumber.split(".")[1]
    let intDisplay
        if(isNaN(intNumber)) {
            intDisplay = ""
        } else {
            intDisplay = intNumber.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if(isNaN(decNumber != null)) {
            return `${intDisplay}.${decNumber}`
        } else {
            return intDisplay
        }
    }

updateCalcScreen() {
    this.currentNumberTextElement.innerText = this.getDivider(this.currentNumber)
    if(this.operation != null){
    this.previousNumberTextElement.innerText = 
        `${this.getDivider(this.previousNumber)} ${this.operation}`
    } else {
        this.previousNumberTextElement.innerText = ""
    }
  }
}

const numButton = document.querySelectorAll("[data-number]")
const mathButton = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
const delButton = document.querySelector("[data-delete]")
const clearButton = document.querySelector("[data-clear]")
const previousNumberTextElement = document.querySelector("[data-previous-operand]")
const currentNumberTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousNumberTextElement, currentNumberTextElement)

numButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.addNewNumber(button.innerText)
        calculator.updateCalcScreen()
    })
})

mathButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.pickOperator(button.innerText)
        calculator.updateCalcScreen()
    })
})

equalButton.addEventListener("click", button => {
    calculator.doMath()
    calculator.updateCalcScreen()
})

clearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateCalcScreen()
})

delButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateCalcScreen()
})
