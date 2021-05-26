//npm requires
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const Questions = require("./lib/questions");
const UserSearch = require("./lib/UserSearch");

const questions = new Questions();
const newSearch = new UserSearch();

const init = () => {
  console.log("Welcome to Employee Tracker");
  loadMenu();
};

const loadMenu = async () => {
  await inquirer.prompt(questions.startPage).then(async (answers) => {
    switch (answers.choice) {
      case "View All Employees":
        await getAllEmployeesFullData();
        break;
      case "View Departments":
        await viewAllDepartments();
        break;
      case "View Roles":
        await viewAllRoles();
        break;
      case "View employees by Manager":
        await viewEmployeesByManager();
        break;
      case "Add a Department":
        await addDepartment();
        break;
      case "Add a Role":
        await addRole();
        break;
      case "Update Employee Role":
        await updateEmployeeRole();
        break;
      case "Add an Employee":
        await addEmployee();
        break;
      case "End":
        break;
      default:
        break;
    }
  });
};
