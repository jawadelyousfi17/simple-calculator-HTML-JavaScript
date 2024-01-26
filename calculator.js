const gById = id => document.getElementById(id)
let inputAlt = document.getElementById('inputAlt')
let calculatorScreen = document.getElementById('calculator-in')
let givenArr = [null, null]
let ans = undefined
let dbg = false
let firstLunch = true
let operationHistory = [null, null, null, null, null, null, null]
let historyIndex = -1
const stringTester = 'test'
let operationTrigred = false 
const ce = _ => {
    givenArr[0] = null
    givenArr[1] = null
    firstLunch = true
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
    console.log('arrr 1 = ' + givenArr[1])
    if (ans != undefined && !firstLunch && givenArr[1] == null) {
        clearScrenn()
        firstLunch = true
    }
    if (typeof (b) == typeof (stringTester)) {
        screenPrint(b)
        return 1
    }
    screenPrint(b.innerHTML)
}
const spetialOperatorClicked = (op) => {
    typed()
    screenPrint(op)
}
const operatorClicked = function (op) {
    typed()
    if (calculatorScreen.value.length == 0 && op == '-') {
        screenPrint(op)
        console.log('yeaaaaaah -')
        return -1
    }
    if (calculatorScreen.value.length == 0 && op != '-') {
        return -1
    }
    if (verifyLastChar(calculatorScreen.value)) {            // verify if the last char is an operator if its an operator do nothing
        del()
        operatorClicked(op)
        return -1;
    }
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
    if (givenArr[1] == null) {
        ans = parseFloat(calculatorScreen.value)
        return 0
    }
    const operation = ['+', '-', '*', '+']

   if(operation.indexOf(calculatorScreen.value.toString().substring(calculatorScreen.value.toString().length-1,calculatorScreen.value.toString().length))!=-1)
        {
            calculatorScreen.value+='0'
            equal(0)
            return 0 ;
        }
    
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
    if (!dbg) {
        firstLunch = false
        ans = result
    }
    history(givenArr, readBehindeIndex(), result)
    clearScrenn()
    screenPrint(result)
    givenArr[0] = null
    givenArr[1] = null
    console.log(result);
    console.log(dbg)

}
const history = (operation, operation2, result) => {
    if (historyIndex >= 6)
        rotateArray(operationHistory)
    else historyIndex++
    operationHistory[historyIndex] = givenArr[0][0] + '' + givenArr[1] + operation2 + '=' + result + '\n'
    writeHistory(operationHistory, historyIndex, document.querySelector('.history'))
    console.log(operationHistory)
}
const writeHistory = function (arr, index, element) {
    if (index >= 6) {
        let spansElements = document.getElementsByTagName('span')
        let th = element.removeChild(spansElements[0])
    }
    const spanH = element.appendChild(document.createElement('span'))
    spanH.textContent = arr[index]
}
const screenPrint = (c) => {
    calculatorScreen.value += c
}
const clearScrenn = _ => {
    calculatorScreen.value = ''
}
const readBehindeIndex = function () {
    const operation = ['+', '-', '*', '+']
    console.log('last char is : ' + parseFloat(calculatorScreen.value.substring(givenArr[0][1] + 1, calculatorScreen.value.length)))
  //  if(operation.indexOf(calculatorScreen.value.substring(givenArr[0][1] , calculatorScreen.value.length))!=0 ) return 0
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
    //if (ans != undefined && firstLunch) clearScrenn()
    if (dbg) {
        clearScrenn()
        dbg = false
    }
}
const rotateArray = c => {
    for (let i = 0; i < c.length - 1; i++) {
        c[i] = c[i + 1]
    }
}
inputAlt.focus()
function keyFunction(event) {
    const operation = ['+', '-', '*', '+']
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
    const equal0 = ['=']
    let key = event.key
    key = key.toString()
    if (operation.indexOf(key) != -1) operatorClicked(key)
    if (numbers.indexOf(key) != -1) buttonClicked(key)
    if(key=='=') equal(0)
    console.log(key)
}

clearScrenn()
