const gById = id => document.getElementById(id)
let calculatorScreen = document.getElementById('calculator-in')
let givenArr = [null, null]
let ans = undefined;
let dbg = false;
const ce = _ => {
    clearScrenn();
}
const del = _ => {                                           // delete the last char 
    if (verifyLastChar(calculatorScreen.value)) givenArr[1] = null
    calculatorScreen.value = calculatorScreen.value.substring(0, calculatorScreen.value.length - 1)
}
const ansM = _ => {
    if (ans != undefined) screenPrint(ans)
    console.log('ansM executed')
}
const buttonClicked = function (b) {
    typed()
    screenPrint(b.innerHTML)
}
const spetialOperatorClicked = (op) => {
    typed()
    screenPrint(op)
}
const operatorClicked = function (op) {
    typed()
    if (verifyLastChar(calculatorScreen.value)) return -1;  // verify if the last char is an operator if its an operator do nothing
    if (givenArr[1] != null) {                              // verify if the last operator is
        equal()
        operatorClicked(op)
        return 0;
    }
    givenArr[0] = [readBehinde(), readBehinde().toString().length]
    givenArr[1] = op
    console.log(givenArr)
    screenPrint(op)
}
const equal = (c) => {
    typed()                                 // result function when the user press = or use an operator after 2 sentences 
    let result;
    if (givenArr[1] == '+') { result = givenArr[0][0] + readBehindeIndex() }
    else if (givenArr[1] == '-') { result = givenArr[0][0] - readBehindeIndex() }
    else if (givenArr[1] == 'x') { result = givenArr[0][0] * readBehindeIndex() }
    else {
        if (verifyDivide(readBehindeIndex())) {
            result = givenArr[0][0] / readBehindeIndex()
        } else {
            result = 'error divide by 0'
            debug()
        }
        // result = verifyDivide(readBehindeIndex()) ? givenArr[0][0] / readBehindeIndex() : 'erroe divide by 0'
    }
    if(!dbg) { ans =  result }
    clearScrenn()
    screenPrint(result)
    givenArr[0] = null
    givenArr[1] = null
    console.log(result);
    console.log(dbg)

}
const screenPrint = (c) => {
    calculatorScreen.value += c
}
const clearScrenn = _ => {
    calculatorScreen.value = ''
}
const readBehindeIndex = function () {
    console.log('last char is : ' + parseFloat(calculatorScreen.value.substring(givenArr[0][1] + 1, calculatorScreen.value.length)))
    return parseFloat(calculatorScreen.value.substring(givenArr[0][1] + 1, calculatorScreen.value.length))
}
const readBehinde = _ => {
    return parseFloat(calculatorScreen.value)
}
const verifyLastChar = s => {
    let lastChar = s.substring(s.length - 1, s.length)
    if (lastChar == '+' || lastChar == '-' || lastChar == 'x' || lastChar == '/') return true
    return false
}
const verifyDivide = e => {
    if (e == 0) return false
    return true
}
const debug = _ => {
    dbg = true;
}
const typed = _ => {
    if (dbg) {
        clearScrenn()
        dbg = false
    }
}


