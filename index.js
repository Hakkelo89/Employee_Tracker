const inquirer = require("inquirer");
const DB = require("./src/db/DB");
const init = async () => {
  const db = new DB("company_db");
  await db.start();
  let inProgress = true;
  while (inProgress) {
    const question = {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        {
          short: "Employees",
          value: "viewAllEmployees",
          name: "View All Employees",
        },
        {
          short: "Employees By Role",
          value: "viewAllEmployeesByRole",
          name: "View All Employees By Role",
        },
        {
          short: "Add Employee",
          value: "addEmployee",
          name: "Add an Employee",
        },
        {
          short: "Remove Employee",
          value: "removeEmployee",
          name: "Remove an Employee",
        },
        {
          value: "updateEmployeeRole",
          name: "Update Employee Role",
        },
        {
          value: "updateEmployeeManager",
          name: "Update Employee Manager",
        },
        {
          short: "Roles",
          value: "viewAllRoles",
          name: "View All Roles",
        },
        {
          value: "addRole",
          name: "Add Role",
        },
        {
          value: "removeRole",
          name: "Remove Role",
        },
        {
          short: "Departments",
          value: "viewAllDepartments",
          name: "View All Departments",
        },
        {
          value: "addDepartment",
          name: "Add Departments",
        },
        {
          value: "removeDepartment",
          name: "Remove Departments",
        },
        {
          short: "Exit",
          value: "exit",
          name: "Exit",
        },
      ],
    };
    const answers = await inquirer.prompt(question);

    if (answers.action === "exit") {
      inProgress = false;
    } else {
      if (answers.action === "viewAllEmployees") {
        const query = "SELECT * FROM employee";
        const data = await db.query(query);
        console.table(data);
      }
      if (answers.action === "viewAllDepartments") {
        const query = "SELECT * FROM department";
        const data = await db.query(query);
        console.table(data);
      }
      if (answers.action === "viewAllEmployeesByRole") {
        const roleQuery = "SELECT * FROM role";
        const allRoles = await db.query(roleQuery);
        const generateChoices = (roles) => {
          return roles.map((role) => {
            return {
              short: role.id,
              name: role.title,
              value: role.id,
            };
          });
        };
        const answers = await inquirer.prompt({
          name: "id",
          type: "list",
          message: "What role would you like to see?",
          choices: generateChoices(allRoles),
        });
        const query = `SELECT * FROM employee WHERE role_id=${answers.id}`;

        const employeeByRole = await db.query(query);

        console.table(employeeByRole);
      }
      if (answers.action === "addEmployee") {
        const roleQuery = "SELECT * FROM role";
        const allRoles = await db.query(roleQuery);
        const generateChoices = (roles) => {
          return roles.map((role) => {
            return {
              short: role.id,
              name: role.title,
              value: role.id,
            };
          });
        };
        const newEmployeeQuestions = [
          {
            type: "input",
            name: "first_name",
            message: "What is your employee first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is your employee last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is your employee role?",
            choices: generateChoices(allRoles),
          },
        ];
        const answers = await inquirer.prompt(newEmployeeQuestions);
        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}');`;
        const data = await db.query(query);
        console.log("Employee Added Successfully");
      }
    }
  }
};

init();
