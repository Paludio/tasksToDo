const ID_INPUT_TASK = 'input-task';

// cria o forms
const main = document.getElementById('pai');
const form = document.createElement('form');

main.appendChild(form);

const label = document.createElement('label');
label.htmlFor = ID_INPUT_TASK;

form.appendChild(label);

const input = document.createElement('input');
input.type = 'text';
input.id = ID_INPUT_TASK;
input.placeholder = 'Tarefa a ser feita';

label.appendChild(input);

const buttonTask = document.createElement('button');
buttonTask.type = 'button';
buttonTask.id = 'add-task';
buttonTask.innerText = 'Adicionar';

label.appendChild(buttonTask);

// aqui acabou a criação do forms

// inicia a criação da seção de cores
const sectionColors = document.createElement('section');
sectionColors.className = 'section-colors';

main.appendChild(sectionColors);

const arrayColors = ['red', 'green', 'blue'];

for (let index = 0; index < arrayColors.length; index += 1) {
  const div = document.createElement('div');
  div.style.backgroundColor = arrayColors[index];
  div.className = 'colors';
  sectionColors.appendChild(div);
}
// acaba a criação das cores

// cria a lista de tarefas
const sectionUl = document.createElement('section');
sectionUl.id = 'section-ul';

const ul = document.createElement('ul');
ul.id = 'ul-tasks';

sectionUl.appendChild(ul);

main.appendChild(sectionUl);
// acaba de criar a lista;

// começa a lógica para adicionar uma tarefa

const verificaTasks = (task) => {
  const ulTasks = document.getElementById('ul-tasks');

  for (let index = 0; index < ulTasks.childNodes.length; index += 1) {
    if (task === ulTasks.childNodes[index].innerText) {
      return true;
    }
  }
  return false;
};

const tasksLocalStorage = [];

const saveLocalStorage = (task) => {
  tasksLocalStorage.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasksLocalStorage));
};

buttonTask.addEventListener('click', () => {
  const inputValue = document.getElementById(ID_INPUT_TASK);

  if (inputValue.value.length === 0) {
    window.alert('Insira uma tarefa');
  }

  const verifica = verificaTasks(inputValue.value);

  if (verifica) {
    return window.alert('Tarefa já existe');
  }

  const li = document.createElement('li');
  li.className = 'li-task';
  li.innerText = inputValue.value;
  ul.appendChild(li);

  saveLocalStorage(inputValue.value);
});

// acaba a lógica de salvar

// adiciona eventos ul
ul.addEventListener('mouseover', (event) => {
  event.target.classList.add('mouseOver');
});

ul.addEventListener('mouseout', (event) => {
  event.target.classList.remove('mouseOver');
});

ul.addEventListener('dblclick', (event) => {
  event.target.remove();
});

// adiciona o evento de mudar as cores
const colors = document.querySelector('.section-colors');

colors.addEventListener('click', (event) => {
  const verify = event.target.classList.contains('selected');

  for (let index = 0; index < colors.childNodes.length; index += 1) {
    colors.childNodes[index].classList.remove('selected');
  }

  if (!verify) {
    event.target.classList.add('selected');
  }
  if (verify) {
    event.target.classList.remove('selected');
  }
});

ul.addEventListener('click', (event) => {
  const color = document.getElementsByClassName('selected');
  const task = event.target;

  if (color.length === 0) {
    task.style.color = 'black';
  }

  if (color.length > 0) {
    task.style.color = color[0].style.backgroundColor;
  }
});

// pega o local storage e aplica na ul
const setItensLocalStorage = (arrayTasks) => {
  if (arrayTasks === null) {
    return false;
  }
  const ulLocalStorage = document.getElementById('ul-tasks');
  for (let index = 0; index < arrayTasks.length; index += 1) {
    const li = document.createElement('li');
    li.innerText = arrayTasks[index];
    ulLocalStorage.appendChild(li);
  }
};

// recupera o local storage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  setItensLocalStorage(savedTasks);
  console.log(savedTasks);
};
