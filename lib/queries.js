const mysql = require("mysql");
const details = require("../config/connection");

const NewConnection = async () => {
  let con = mysql.createConnection(details);
  con.connect((err) => {
    if (err) throw err;
  });
  return con;
};

class QUERY {
  async getAllDepartments() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM department";
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getAllDepartmentNames() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = "SELECT name FROM department";
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getAllEmployees() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM  employee";
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getAllEmployeeNames() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = "SELECT id, first_name, last_name FROM employee";
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getAllEmployeesFullData() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT  employee.id,
    first_name,
    last_name,
    roles.title,
    roles.salary,
    (select concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE employee.manager_id = e2.id) AS 'manager',
    department.name
    FROM employee AS employee
    LEFT JOIN roles AS roles ON employee.role_id = roles.id
    LEFT JOIN department AS department ON roles.department_id = department.id`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getAllManagerNames() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT distinct id,
    concat(first_name, ' ',last_name) AS 'name'          
    FROM employee
    WHERE id IN (select manager_id FROM employee WHERE manager_id is not null)`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getEmployeeByName(fullName) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT  employee.id,
    first_name,
    last_name,
    roles.title,
    roles.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE employee.manager_id = e2.id) AS 'manager',
    department.name
    FROM employee AS employee
    LEFT JOIN roles AS roles ON employee.role_id = roles.id
    LEFT JOIN department AS department ON roles.department_id = department.id
    WHERE concat(first_name, ' ',last_name) = '${fullName}'`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getEmployeeByName(id) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT  employee.id,
    first_name,
    last_name,
    roles.title,
    roles.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE employee.manager_id = e2.id) AS 'manager',
    department.name
    FROM employee AS employee
    LEFT JOIN roles AS roles on employee.role_id = roles.id
    LEFT JOIN department AS department on roles.department_id = department.id
    WHERE employee.id = ${id}`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getEmployeesByDepartment(department) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT  employee.id,
    first_name,
    last_name,
    roles.title,
    roles.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE employee.manager_id = e2.id) AS 'manager'            
    FROM employee AS employee
    LEFT JOIN roles AS roles ON employee.role_id = roles.id
    LEFT JOIN department AS department ON roles.department_id = department.id
    WHERE department.name = '${department}'`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getEmployeesByManager(manager) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT  employee.id,
    first_name,
    last_name,
    roles.title,
    roles.salary,          
    department.name
    FROM employee AS employee
    LEFT JOIN roles AS roles ON employee.role_id = roles.id
    LEFT JOIN department AS department ON roles.department_id = department.id
    WHERE manager_id = ${manager.id}`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getEmployeesByRole(role) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT  employee.id,
    first_name,
    last_name,
    roles.salary,
    (SELECT concat(e2.first_name,' ',e2.last_name) FROM employee AS e2 WHERE employee.manager_id = e2.id) AS 'manager',            
    department.name AS 'department'
    FROM employee AS employee
    LEFT JOIN roles AS roles ON employee.role_id = roles.id
    LEFT JOIN department AS department ON roles.department_id = department.id
    WHERE roles.title = '${role}'`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getAllRoles() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM roles";
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async getAllRolesWithDepartmentName() {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `SELECT roles.id, title, salary, department.name AS 'department'
    FROM roles AS roles
    LEFT JOIN department AS department ON roles.department_id = department.id`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async updateEmployeeRole(employee, role) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `UPDATE employee SET role_id = ${role.id}
    WHERE id = ${employee.id} `;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve("role updated");
      });
    });
  }
  async addEmployee(employee) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
    VALUES ('${employee.first_name}',
            '${employee.last_name}',
            ${employee.role_id},
            ${employee.manager_id})`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res.insertId);
      });
    });
  }
  async addRole(role) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO roles
    (title, salary, department_id)
    VALUES ('${role.title}',
            ${role.salary},
            ${role.department_id})`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res.insertId);
      });
    });
  }
  async addDepartment(department) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO department(name) VALUES ('${department}')`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res.insertId);
      });
    });
  }
  async removeDepartment(id) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM department WHERE id = ${id}`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async removeEmployee(id) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM employee WHERE id = ${id}`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
  async removeRole(id) {
    let con = await NewConnection();
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM roles WHERE id = ${id}`;
      con.query(query, (err, res) => {
        if (err) throw err;
        con.end();
        resolve(res);
      });
    });
  }
}

module.exports = QUERY;
