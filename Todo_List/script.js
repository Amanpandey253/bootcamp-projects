const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const categorySelect = document.getElementById("category-select");

window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.category, task.completed));
};

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;

  if (taskText === "") return alert("Please enter a task!");

  createTaskElement(taskText, category, false);
  saveTasks();
  taskInput.value = "";
}

function createTaskElement(text, category, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <div>
      <span class="category-badge category-${category}">${category}</span>
      <span>${text}</span>
    </div>
    <div class="actions">
      <button class="done">✔</button>
      <button class="delete">✖</button>
    </div>
  `;

  li.querySelector(".done").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    const text = li.querySelector("span:last-child").innerText;
    const category = li.querySelector(".category-badge").innerText;
    const completed = li.classList.contains("completed");

    tasks.push({ text, category, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
