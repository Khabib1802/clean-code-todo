const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
};

const moveTask = function (listItem, targetList, checkboxHandler) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, checkboxHandler);
};

const completeTask = function () {
  moveTask(this.parentNode, completedList, reopenTask);
};

const reopenTask = function () {
  moveTask(this.parentNode, todoList, completeTask);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (listItem, checkboxHandler) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkboxHandler;
};

const bindTasksInList = function (list, checkboxHandler) {
  for (const listItem of list.children) {
    bindTaskEvents(listItem, checkboxHandler);
  }
};

bindTasksInList(todoList, completeTask);
bindTasksInList(completedList, reopenTask);
