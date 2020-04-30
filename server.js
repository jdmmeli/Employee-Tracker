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
            message: "Employee database. Choose an action",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Update employees",
                "Add department",
                "Add roles",
                "Add employees",
                "exit"

            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all departments":
                    viewDepartments();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "View all employees":
                    viewEmployees();
                    break;

                case "Update Employees":
                    updateEmployees();
                    break;

                case "Add Departments":
                    addDepartments();
                    break;

                case "Add Roles":
                    addRoles();
                    break;

                case "Add employeess":
                    addEmployees();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function viewDepartments() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM departments", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All Departments:', res);
    //   runSearch();
    });
    runSearch();
  }

  function viewRoles() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All roles:', res);
    //   runSearch();
    });
    runSearch();
  }

  function viewEmployees() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employees", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All employees:', res);
    //   runSearch();
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
          "INSERT INTO department SET ?",
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
        // runSearch();
      }); runSearch();
  }
