//Control de variables
const tasks = [];
let time = 0;
let timer = null;
let taskIndex = 0;

//Capturo los elementos
const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');
const timeDiv = document.querySelector('#time #value');

renderTime();

//En escucha del evento submit en el formulaio
form.addEventListener('submit', e => {
  e.preventDefault();

  if (itTask.value) {

    //Creo la  tarea
    createTask(itTask.value)

    // Seteo el campo
    itTask.value = '';
  }
  renderTasks();

})

function createTask(task) {
  // Creo un objeto para la tarea
  const newTask = {
    //Creando id
    id: (Math.random() * 100).toString(36).slice(3),
    //Nombre de la tarea
    title: task,
    //Estado de la tarea
    completed: false
  }
  //Incorporo la nueva tarea al principio del array
  tasks.unshift(newTask);

}

function renderTasks() {
  //Incorporo html a las tareas
  const listTask = tasks.map(task => {
    return `
    <div class = 'task'>
    <div class='completed'>
    ${task.completed ? `<span class='done'>Completada  </span> ` : `<button class='start_button' data-id='${task.id}'>Iniciar</button>`}
    </div>
    <div class='title'>${task.title}</div>
    </div>
    `
  });
  //Busco el contenedor 
  const task_coitainer = document.getElementById('tasks');
  //Inyecto el listado al container
  //Utilizo el join ya que es un string y de paso separo las tareas por ' '
  task_coitainer.innerHTML = listTask.join(' ');

  const buttonStart = document.querySelectorAll('.task .start_button');
  buttonStart.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      if (!timer) {
        const id_button = button.getAttribute('data-id');
        startButtonHandle(id_button);
        button.textContent = 'En progreso ...';
      }
    })

  })

}

function startButtonHandle(id) {
  //Control de los 25mn
  time = 5;
  //Para que el cronometro salga en el tiempo inicial
  renderTime();

  //Busco el index del elemento
  taskIndex = tasks.findIndex((task) => task.id === id);
  //Le incorporo el nombre de la tarea
  taskName.textContent = tasks[taskIndex].title;
  //Incorporo setInerval para cada 1s llame timeHandler  
  timer = setInterval(() => {
    timeHandler();
  }, 1000)

}

function timeHandler() {
  //Quito tiempo
  time--;
  //Compruebo hasta que llegue 0 el tiempo para detener el setInterval y completar la tarea
  if (time === 0) {

    completedTask();

  }
  //Control del tiempo
  renderTime();

}

function renderTime() {
  //Control de los minutos
  const minute = parseInt(time / 60);
  //Control de los segundos
  const seconds = parseInt(time % 60);
  //Inyecto al elemnto div la cadena del time
  //Valido en la numeracion
  timeDiv.textContent = `${minute < 10 ? '0' : ''}${minute}:${seconds < 10 ? '0' : ''}${seconds}`
}

function completedTask() {
  //Desactivo el interval
  clearInterval(timer);
  //Seteo el timer
  timer = null;

  //Seteo el nombre 
  taskName.textContent = '';
  //Se completo la tarea
  tasks[taskIndex].completed = true;
  //Renderizo las tareas
  renderTasks();
  //Seteo el elemnto donde se muestra el time
  timeDiv.textContent = '';
}