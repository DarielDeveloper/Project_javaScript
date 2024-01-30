//Busco los elementos
const inputCard = document.getElementById('inputCard');
const inputDate = document.getElementById('inputDate');
const inputCVV = document.getElementById('inputCVV');

const maskNumber = '####-####-####-####';
const maskDate = '##/##';
const maskCVV = '####';

let current = '';
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

inputCard.addEventListener('keydown', e => {
  if (e.key == 'Tab') {
    return;
  }
  e.preventDefault();
  handleInput(maskNumber, e.key, cardNumber);
  inputCard.value = cardNumber.join('');
})

function handleInput(maskNumber, key, arrayNumber) {

  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  if (key === 'Backspace' && arrayNumber.length > 0) {
    arrayNumber.pop();
    return;
  }
  if (numbers.includes(key) && arrayNumber.length + 1 <= maskNumber.length) {

    if (maskNumber[arrayNumber.length] === '-' || maskNumber[arrayNumber.length] === '/') {

      arrayNumber.push(maskNumber[arrayNumber.length], key);
    }
    else {

      arrayNumber.push(key);
    }
  }

}
