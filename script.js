class Calculator {
    constructor(input, lastClickWasEquals, isFirstClick){
        this._input = input
        this._lastClickWasEquals = lastClickWasEquals
        this._isFirstClick = isFirstClick
    }
    get input(){
        return this._input
    }
    get lastClickWasEquals(){
        return this._lastClickWasEquals
    }
    get isFirstClick() {
        return this._isFirstClick
    }
    set input (i){
        this._input = i
    }
    set lastClickWasEquals(l){
        this._lastClickWasEquals = l
    }
    set isFirstClick(i) {
        this._isFirstClick = i
    }

    checkOperand(op) {
        let operand = ""
        if (op.classList.contains("plus")){
            console.log("Plus")
            operand = "+"
        }
        else if (op.classList.contains("minus")){
            console.log("Minus")
            operand = "-"
        }
        else if (op.classList.contains("multiply")){
            console.log("Multiply")
            operand = "*"
        }
        else { //it's a divide
            console.log("Divide")
            operand = "/"
        }
        return operand
    }

    parseStr (str){
        // check if string begins wiht an operand; if so, unshift a zero onto front of string.
        let strArr = str.split("")
    
        if (!this.isNumber(Number(strArr[0]))){
            strArr.unshift('0')
            str=strArr.join("")
        }
    
        console.log(str)
    
        return Function(` return (${str})`)()
    }

    isNumber(char) {
        return /^[0-9]+$/.test(char);
    }

}

let calc = new Calculator("0", false, true)

let btn = document.getElementsByClassName("button");
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', getButton, false);
}

function getButton (){

    if (this.classList.contains("clear")){
        console.log("Clearing...")
        calc.input = "0"
        calc.lastClickWasEquals = false
    }
    else if (this.classList.contains("equals")){
        console.log("Time to evaluate...")
        calc.input = calc.parseStr(calc.input) // add function here to parse string
        calc.lastClickWasEquals = true
    }
    else if (!this.classList.contains("number")){
        calc.input += calc.checkOperand(this)
        calc.lastClickWasEquals = false
    }
    else {
        if (calc.lastClickWasEquals || calc.isFirstClick){
            calc.input = this.innerHTML
            console.log("HERE")
        }
        else calc.input += this.innerHTML
        calc.lastClickWasEquals = false
    }
    console.log (`Input: ${calc.input}`)
    let screen = document.querySelector(".calc-screen")
    screen.innerHTML = calc.input
    calc.isFirstClick = false
}
