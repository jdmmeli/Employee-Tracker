const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "1Grondster43!",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
  inquirer
  .prompt({
      name: "action",
      type: "list",
      message: "Welcome to our employee database! What would you like to do?",
      choices: [
              "View all employees",
              "View all departments",
              "View all roles",
              "Add an employee",
              "Add department",
              "Add a role",
              "EXIT"
      ]
  }).then(function (answer) {
      switch (answer.action) {
          case "View all employees":
              viewEmployees();
              break;
          case "View all departments":
              viewDepartments();
              break;
          case "View all roles":
              viewRoles();
              break;
          case "Add an employee":
              addEmployee();
              break;
          case "Add department":
              addDepartment();
              break;
          case "Add a role":
              addRole();
              break;
          case "EXIT": 
              endApp();
              break;
          default:
              break;
      }
  })
}
function viewDepartments() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM departments", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All Departments:', res);
      // runSearch();
    });
    runSearch();
  }

  function viewRoles() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All roles:', res);
      // runSearch();
    });
    runSearch();
  }

  function viewEmployees() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employees", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All employees:', res);
      // runSearch();
    });
    runSearch();
  }
  // function updateEmployees() {
  //   console.log("Updating all Beatles genres...\n");
  //   var query = connection.query(
  //     "UPDATE songs SET ? WHERE ?",
  //     [
  //       {
  //         genre: "classic rock"
  //       },
  //       {
  //         artist: "Beatles"
  //       }
  //     ],
  //     function(err, res) {
  //       if (err) throw err;
  //       console.log(res.affectedRows + " genre updated!\n");
        
       
  //     }
  //   );
  //   runSearch();
  // }
  function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "enter department name",
        name: "dept"
      })
      .then(function(answer) {
        connection.query(
          "INSERT INTO departments SET ?",
          {
            name: answer.dept
          },
          function(err, answer) {
            if (err) {
              throw err;
            }
          }
        ),
          console.table(answer);
          runSearch();
      }); 
  }
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "enter employee title",
          name: "addtitle"
        },
        {
          type: "input",
          message: "enter employee salary",
          name: "addsalary"
        },
        {
          type: "input",
          message: "enter employee department id",
          name: "addDepId"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.addtitle,
            salary: answer.addsalary,
            department_id: answer.addDepId
          },
          function(err, answer) {
            if (err) {
              throw err;
            }
            console.table(answer);
            runSearch();
          }
        );
       
      }); 
  }
  function addEmployee() {
    inquirer
      .prompt({
        type: "input",
        message: "enter employees first name",
        name: "firstname"
      },
        {
          type: "input",
          message: "enter employees last name",
          name: "lastname"
        },
        {
          type: "input",
          message: "enter employees role id",
          name: "roleid"
        },
        {
          type: "input",
          message: "enter employees manager id",
          name: "managerid"
        
        })
      .then(function(answer) {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.rollid,
            manager_id: answer.managerid
          },
          function(err, answer) {
            if (err) {
              throw err;
            }
          }
        ),
          console.table(answer);
          runSearch();
      }); 
  }
