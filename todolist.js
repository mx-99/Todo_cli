const fs = require('fs');

let tasks = [];

module.exports = {
  addTask: function(task) {
    tasks.push(task);
    this.saveTasks();
    console.log("Task added succesfully")
    console.log("");
  },
  isTaskExists: function(id) {
    return id >= 0 && id < tasks.length;
  },
  updateTask: function(id, newTask) {
    tasks[id] = newTask;
    this.saveTasks();
    console.log("Task updated succesfully")
    console.log("");
  },
  displayTasks: function() {
    console.log("Existing Tasks")
    tasks.forEach((task, id) => console.log(id, task));
    console.log("");
  },
  deleteTask: function(id) {
    tasks = tasks.filter((task, taskId) => taskId != id);
    this.saveTasks();
    console.log("Task deleted succesfully")
    console.log("");
  },
  saveTasks: function() {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
  },
  loadTasks: function() {
    try {
      tasks = JSON.parse(fs.readFileSync('tasks.json'));
    } catch (err) {
      tasks = [];
    }
  }
};

