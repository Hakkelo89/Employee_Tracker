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
