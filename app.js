// 1. Obtener elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// 2. Cargar tareas guardadas al iniciar la aplicación
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 3. Mostrar las tareas guardadas
function loadTasks() {
  list.innerHTML = ''; // Limpiar lista antes de cargar
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

// 4. Función para crear elemento visual de tarea
function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  
  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'task-text';
  if (completed) {
    span.classList.add('completed');
  }

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✓';
  completeBtn.className = 'btn-complete';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.className = 'btn-delete';

  // Evento para marcar/desmarcar
  completeBtn.addEventListener('click', function () {
    span.classList.toggle('completed');
    updateTask(text, span.classList.contains('completed'));
  });

  // Evento para eliminar
  deleteBtn.addEventListener('click', function () {
    list.removeChild(li);
    deleteTask(text);
  });

  li.appendChild(completeBtn);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// 5. Función para añadir nueva tarea
function addTask(text) {
  const task = { text, completed: false };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  createTaskElement(text, false);
}

// 6. Función para actualizar estado (completada/no completada)
function updateTask(text, completed) {
  const taskIndex = tasks.findIndex(task => task.text === text);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = completed; // CORRECCIÓN: punto, no coma
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// 7. Función para eliminar tarea
function deleteTask(text) {
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 8. Escuchar el envío del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') return;

  addTask(taskText);
  input.value = '';
  input.focus();
});

// 9. Cargar tareas al iniciar la página
loadTasks();