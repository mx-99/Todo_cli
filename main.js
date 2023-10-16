// main.js
const readline = require('readline');
const todoList = require('./todolist');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

todoList.loadTasks();

const promptUser = () => {
console.log(`Commands: Choose the number adjecent to a Task
1. Add a task
2. Update a task
3. Display tasks
4. Delete a task
q. Quit the application.`);


rl.question('What do you want to do? ', (answer) => {
  switch(answer) {
    case '1':
      rl.question('Enter the task: ', (task) => {
        todoList.addTask(task);
        promptUser();
      });
      break;
    case '2':
      todoList.displayTasks();
      const askForId = () => {
        rl.question('Enter the ID of the task you want to update: ', (id) => {
          if (todoList.isTaskExists(Number(id))) {
            rl.question('Enter the new task: ', (newTask) => {
              todoList.updateTask(Number(id), newTask);
              promptUser();
            });
          } else {
            console.log('Invalid ID. Please try again.');
            todoList.displayTasks();
            console.log("")
            askForId();
          }
        });
      };
      askForId();
      break;  
    case '3':
      todoList.displayTasks();
      promptUser();
      break;
    case '4':
      todoList.displayTasks();
      const askForIdToDelete = () => {
        rl.question('Enter the ID of the task you want to delete: ', (id) => {
          if (todoList.isTaskExists(Number(id))) {
            todoList.deleteTask(Number(id));
            promptUser();

          } else {
            console.log('Invalid ID. Please try again.');
            todoList.displayTasks();
            console.log("")
            askForIdToDelete();
          }
        });
      };
      askForIdToDelete();
      break;
      case 'q':
      console.log('Quitting the application.');
      rl.close();
      break;
    default:
      console.log('Invalid command.');
      console.log("");
      promptUser(); 
  }
});
};

promptUser();
