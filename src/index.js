const main = document.getElementById('pai');
const form = document.createElement('form');

main.appendChild(form);

const label = document.createElement('label');
label.htmlFor = 'input-task';

form.appendChild(label);

const inputTask = document.createElement('input');
inputTask.type = 'text';
inputTask.placeholder = 'Tarefa a ser feita';
inputTask.id = 'input-task';

label.appendChild(inputTask);

const buttonTask = document.createElement('button');
buttonTask.type = 'button';
buttonTask.id = 'add-task';
buttonTask.disabled = false;
buttonTask.innerText = 'Adicionar';

label.appendChild(buttonTask);

const sectionPaleteColors = document.createElement('section');
sectionPaleteColors.className = 'section-colors';

main.appendChild(sectionPaleteColors);

const colorsArray = ['red', 'yellow', 'blue'];

for (let index = 0; index < colorsArray.length; index += 1) {
  const div = document.createElement('div');
  div.style.backgroundColor = colorsArray[index];
  div.className = 'colors';
  sectionPaleteColors.appendChild(div);
}

const sectionUl = document.createElement('section');
sectionUl.id = 'section-ul';

main.appendChild(sectionUl);

const ul = document.createElement('ul');
ul.id = 'ul-tasks';

sectionUl.appendChild(ul);

const verificaTask = (task) => {
  const ulTasks = document.getElementById('ul-tasks');

  for (let index = 0; index < ulTasks.childNodes.length; index += 1) {
    if (task === ulTasks.childNodes[index].innerText) {
      return true;
    }
  }
};

const tasks = [];

buttonTask.addEventListener('click', () => {
  if (inputTask.value.length === 0) {
    return window.alert('Digite uma tarefa');
  }

  const verifica = verificaTask(inputTask.value);

  if (verifica) {
    return window.alert('Tarefa já existe');
  }

  const li = document.createElement('li');
  li.className = 'li-task';
  li.innerText = inputTask.value;
  tasks.push(inputTask.value);
  ul.appendChild(li);

  localStorage.setItem('tasks', JSON.stringify(tasks));
});

ul.addEventListener('dblclick', (event) => {
  event.target.remove();
  for (let index = 0; index < tasks.length; index += 1) {
    if (event.target.innerText === tasks[index]) {
      tasks.splice(index, 1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

ul.addEventListener('mouseover', (event) => {
  event.target.classList.add('mouseOver');
});

ul.addEventListener('mouseout', (event) => {
  event.target.classList.remove('mouseOver');
});

const colors = document.querySelector('.section-colors');

colors.addEventListener('click', (event) => {
  for (let index = 0; index < colors.childNodes.length; index += 1) {
    colors.childNodes[index].classList.remove('selected');
  }
  const verify = event.target.classList.contains('selected');

  if (verify) {
    return event.target.classList.remove('selected');
  }

  event.target.classList.add('selected');
});

ul.addEventListener('click', (event) => {
  const color = document.getElementsByClassName('selected');
  const task = event.target;

  task.style.color = color[0].style.backgroundColor;
});

const setItensLocalStorage = (arrayTasks) => {
  if (!arrayTasks) {
    return false;
  }

  for (let index = 0; index < arrayTasks.length; index += 1) {
    const li = document.createElement('li');
    li.innerHTML = arrayTasks[index];
    ul.appendChild(li);
  }
};

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  setItensLocalStorage(savedTasks);
};
