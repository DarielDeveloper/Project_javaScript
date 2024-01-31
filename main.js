//Busco los elementos
const inputCard = document.getElementById('inputCard');
const inputDate = document.getElementById('inputDate');
const inputCVV = document.getElementById('inputCVV');
//Plantilla
const maskNumber = '####-####-####-####';
const maskDate = '##/##';
const maskCVV = '####';
//Variables de control
let current = '';
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];
//Variable de control para los días y los meses
let mesDiaValidate = {
  '01': 31,
  '02': 28,
  '03': 31,
  '04': 30,
  '05': 30,
  '06': 30,
  '07': 30,
  '08': 30,
  '09': 30,
  '10': 30,
  '11': 30,
  '12': 31
}

//Incorporo el evento keydown para el control de las teclas presionadas
inputCard.addEventListener('keydown', e => {
  if (e.key == 'Tab') {
    return;
  }
  e.preventDefault();
  //Función de la lógica
  handleInput(maskNumber, e.key, cardNumber);
  //Asignamos la numeración al input
  inputCard.value = cardNumber.join('');
})

inputDate.addEventListener('keydown', e => {
  if (e.key == 'Tab') {
    return;
  }
  e.preventDefault();
  //Función de la lógica
  handleInput(maskDate, e.key, dateNumber);
  //Valido el primer numero
  if (dateNumber[0] > 1) {
    //Elimino el elemento 
    dateNumber.pop();
  }
  //Caso que se encuentra la fecha completa
  if (dateNumber.length == 5) {
    //Divido el array por el / para tener control de las partes
    let numSplit = dateNumber.join('').split('/');
    //Macheo en el objecto 
    if (mesDiaValidate[numSplit[0]] < Number(numSplit[1])) {
      //Elimino el elemento 
      dateNumber.pop();
      dateNumber.pop();
    }
  }
  //Asignamos la numeración al input
  inputDate.value = dateNumber.join('');
})

inputCVV.addEventListener('keydown', e => {
  if (e.key == 'Tab') {
    return;
  }
  e.preventDefault();
  //Función de la lógica
  handleInput(maskCVV, e.key, cvvNumber);
  //Asignamos la numeración al input
  inputCVV.value = cvvNumber.join('');
})

function handleInput(maskNumber, key, arrayNumber) {

  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  //Caso para borrar 
  if (key === 'Backspace' && arrayNumber.length > 0) {
    arrayNumber.pop();
    return;
  }
  //Validando la tecla 
  if (numbers.includes(key) && arrayNumber.length + 1 <= maskNumber.length) {
    //Caso de los separadores
    if (maskNumber[arrayNumber.length] === '-' || maskNumber[arrayNumber.length] === '/') {
      //Añadimos al array el separador y el key validado
      arrayNumber.push(maskNumber[arrayNumber.length], key);
    }
    //Solo se añade la key
    else {
      arrayNumber.push(key);
    }
  }

}
