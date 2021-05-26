const QUERY = require("./queries");
const Employee = require("./employee");
const Role = require("./role");
const Department = require("./department");

const myQuery = new QUERY();

class UserSearch {
  getAllDepartments() {
    return new Promise((resolve, reject) => {
      resolve(myQuery.getAllDepartments());
    });
  }
  viewAllRoles() {
    return new Promise((resolve, reject) => {
      myQuery.getAllRolesWithDepartmentName().then((res) => {
        resolve(res);
      });
    });
  }
  getAllRoles() {
    return new Promise((resolve, reject) => {
      myQuery.getAllRoles().then((res) => {
        resolve(res);
      });
    });
  }

  viewAllDepartments() {
    return new Promise((resolve, reject) => {
      myQuery.getAllDepartments().then((res) => {
        resolve(
          res.map(({ name }) => {
            return {
              name: name,
            };
          })
        );
      });
    });
  }

  getAllEmployees() {
    return new Promise((resolve, reject) => {
      resolve(myQuery.getAllEmployees());
    });
  }

  getAllEmployeesFullData() {
    return new Promise((resolve, reject) => {
      resolve(myQuery.getAllEmployeesFullData());
    });
  }

  getAllManagerNames() {
    return new Promise((resolve, reject) => {
      resolve(myQuery.getAllManagerNames());
    });
  }
  getEmployeesByManager(manager) {
    return new Promise((resolve, reject) => {
      resolve(myQuery.getEmployeesByManager(manager));
    });
  }
  updateEmployeeRole(employee, role) {
    return new Promise((resolve, reject) => {
      resolve(myQuery.updateEmployeeRole(employee, role));
    });
  }
  async addRole(role) {
    return new Promise(async function (resolve, reject) {
      await myQuery.getAllRoles().then((res) => {
        if (
          res.find((employee) => {
            employee.title === role.title &&
              employee.department_id === role.department_id;
          }) != null
        ) {
          resolve("A role with that title and department already exists");
          return;
        }
        resolve(myQuery.addRole(role));
      });
    });
  }
  async addEmployee(employee) {
    return new Promise(async function (resolve, reject) {
      await myQuery.getAllEmployees().then((res) => {
        if (
          res.find((employee) => {
            employee.first_name === employee.firstName &&
              employee.last_name === employee.last_name &&
              employee.role_id === employee.role_id;
          }) != null
        ) {
          resolve("An employee with that name and role already exists");
          return;
        }
        resolve(myQuery.addEmployee(employee));
      });
    });
  }
  async addDepartment(department) {
    return new Promise(async function (resolve, reject) {
      await myQuery.getAllDepartmentNames().then((res) => {
        if (res.indexOf(department) != -1) {
          resolve("Department already exists");
          return;
        }
        resolve(myQuery.addDepartment(department));
      });
    });
  }
}

module.exports = UserSearch;
