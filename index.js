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

      if (answers.action === "viewAllRoles") {
        const query = "SELECT * FROM role";
        const data = await db.query(query);
        console.table(data);
      }

      if (answers.action === "removeEmployee") {
        const empSelect = "SELECT * FROM employee";
        const empData = await db.query(empSelect);
        console.table(empData);
        const removedEmployee = [
          {
            type: "input",
            name: "id",
            message: "Please input id which user you want to delete?",
          },
        ];
        const deleteQuery = await inquirer.prompt(removedEmployee);
        const query = `DELETE FROM employee WHERE ID = ('${deleteQuery.id}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM employee";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("Employee Removed Successfully");
      }

      if (answers.action === "updateEmployeeRole") {
        const empSelect = "SELECT * FROM employee";
        const empData = await db.query(empSelect);
        console.table(empData);
        const updateEmployeeRole = [
          {
            type: "input",
            name: "id",
            message: "Please input id which user you want to update?",
          },
          {
            type: "input",
            name: "role_id",
            message: "Please input new role id for employee?",
          },
        ];
        const updateQuery = await inquirer.prompt(updateEmployeeRole);
        const query = `UPDATE employee SET role_id = ('${updateQuery.role_id}') WHERE ID = ('${updateQuery.id}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM employee";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("Employee Role Updated Successfully");
      }

      if (answers.action === "updateEmployeeManager") {
        const empSelect = "SELECT * FROM employee";
        const empData = await db.query(empSelect);
        console.table(empData);
        const updateEmployeeManager = [
          {
            type: "input",
            name: "id",
            message: "Please input id which user you want to update?",
          },
          {
            type: "input",
            name: "manager_id",
            message: "Please input new manager id for employee?",
          },
        ];
        const updateQuery = await inquirer.prompt(updateEmployeeManager);
        const query = `UPDATE employee SET manager_id = ('${updateQuery.manager_id}') WHERE ID = ('${updateQuery.id}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM employee";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("Employee Manager Updated Successfully");
      }

      if (answers.action === "addRole") {
        const role = "SELECT * FROM role";
        const roleData = await db.query(role);
        console.table(roleData);
        const addRole = [
          {
            type: "input",
            name: "title",
            message: "Please input a title for new role?",
          },
          {
            type: "number",
            name: "salary",
            message: "Please set the salary for this role?",
          },
          {
            type: "input",
            name: "department_id",
            message: "Please set the department id?",
          },
        ];
        const insertQuery = await inquirer.prompt(addRole);
        const query = `INSERT INTO role (title, salary, department_id) VALUES ('${insertQuery.title}', '${insertQuery.salary}', '${insertQuery.department_id}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM role";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("New Role Added Successfully");
      }

      if (answers.action === "removeRole") {
        const role = "SELECT * FROM role";
        const roleData = await db.query(role);
        console.table(roleData);
        const removeRole = [
          {
            type: "input",
            name: "id",
            message: "Please input an id which role you want to remove?",
          },
        ];
        const removeQuery = await inquirer.prompt(removeRole);
        const query = `DELETE FROM role WHERE ID = ('${removeQuery.id}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM role";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("Role Removed Successfully");
      }

      if (answers.action === "addDepartment") {
        const dp = "SELECT * FROM department";
        const dpData = await db.query(dp);
        console.table(dpData);
        const addDepartment = [
          {
            type: "input",
            name: "name",
            message: "Please input department name?",
          },
        ];
        const insertQuery = await inquirer.prompt(addDepartment);
        const query = `INSERT INTO department (name) VALUES ('${insertQuery.name}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM department";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("New Department Added Successfully");
      }

      if (answers.action === "removeDepartment") {
        const dp = "SELECT * FROM department";
        const dpData = await db.query(dp);
        console.table(dpData);
        const removeDepartment = [
          {
            type: "input",
            name: "id",
            message: "Please input an id which department you want to remove?",
          },
        ];
        const removeQuery = await inquirer.prompt(removeDepartment);
        const query = `DELETE FROM department WHERE ID = ('${removeQuery.id}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM department";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("Department Removed Successfully");
      }
    }
  }
};

init();
