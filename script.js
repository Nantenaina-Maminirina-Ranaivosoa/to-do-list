const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Charger les tâches existantes
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

addBtn.addEventListener('click', () => {
  const task = input.value.trim();
  if (task !== "") {
    const todo = {
      text: task,
      completed: false
    };
    todos.push(todo);
    updateLocalStorage();
    renderTodos();
    input.value = '';
  }
});

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTodo(${index})">🗑</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  updateLocalStorage();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  updateLocalStorage();
  renderTodos();
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
