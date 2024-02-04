const ratingContainer = document.querySelector('.rating');
let currentValue = 0;
const limit = 5;

//Creo elemento de acuerdo a la cantidad 
const html = Array.from(Array(limit)).map((_, i) => {
  //Lo identifico por el index
  return `<div class='item item-${i}' data-pos='${i}'></div>`;
});

//Lo incorporo al HTML
ratingContainer.innerHTML = html.join('');
//Capturo los item
document.querySelectorAll('.item').forEach((item) => {
  //Activo el evento 
  item.addEventListener('mouseover', e => {
    //Capturo el id del elemento
    const pos = item.getAttribute('data-pos');
    //Validar para que no renderice el DOM en esa posición 
    if (currentValue === parseInt(pos) + 1) {
      return;
    }
    //Quito la clase 
    document.querySelectorAll('.item').forEach((it) => {
      if (it.classList.contains('item-full')) {
        it.classList.remove('item-full');
      }
    });


    //Incorporo la clase
    for (let i = 0; i <= pos; i++) {
      //Capturo 
      const square = document.querySelector(`.item-${i}`);
      if (!square.classList.contains('item-full')) {
        square.classList.add('item-full');
      }

    }
    //Actualizando la posición donde se quedo
    currentValue = parseInt(pos) + 1;
  });

  //Evento click para saber donde se marca 
  item.addEventListener('click', e => {
    const posClick = item.getAttribute('data-pos');
    //Posición donde se dio el click
    currentValue = parseInt(posClick) + 1;

  });
});
