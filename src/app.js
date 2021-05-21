class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decDigits = stringNumber.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }

        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decDigits != null) {
            return `${integerDisplay}.${decDigits}`
        }

        else {
            return integerDisplay
        }
    }

    update() {
        this.currentOperandElement.innerHTML = this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            this.previousOperandElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }

        else {
            this.previousOperandElement.innerHTML = ''
        }
    }
}

const number = document.querySelectorAll('[data-number')
const operation = document.querySelectorAll('[data-operation')
const result = document.querySelector('[data-result]')
const ce = document.querySelector('[data-ce]')
const ac = document.querySelector('[data-ac]')
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandElement, currentOperandElement)

number.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML.toString())
        calculator.update()
    })
})

operation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML.toString())
        calculator.update()
    })
})

result.addEventListener('click', button => {
    calculator.compute()
    calculator.update()
})

ac.addEventListener('click', button => {
    calculator.clear()
    calculator.update()
})

ce.addEventListener('click', button => {
    calculator.delete()
    calculator.update()
})