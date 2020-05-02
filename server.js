// getting the dependencies we need
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")
//setting up the port and connection
const connection = mysql.createConnection({
    host: "localhost",

    
    port: 3306,

  
    user: "root",
    password: "1Grondster43!",
    database: "employee_DB"
});
//starting the connection
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});
//function to give the user choice of what they want to do
function runSearch() {
  inquirer
  .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
              "View all employees",
              "View all departments",
              "View all roles",
              "Add an employee",
              "Add department",
              "Add a role",
              "Update an employee",
              
      ]
      //sending the user to what they chose
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
          case "Update Employee":
               updateEmployee(); 
               break;   
          
      }
  })
}
//function to view departments
function viewDepartments() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM departments", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All Departments:', res);
      
    });
    runSearch();
  }
//function to view roles
  function viewRoles() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All roles:', res);
     
    });
    runSearch();
  }
// function to view employees
  function viewEmployees() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employees", function(err, res) {
      if (err) throw err;
      console.log(res);
      console.table('All employees:', res);
      
    });
    runSearch();
  }
  //function to add department
  function addDepartment() {
    //gets input from user
    inquirer
      .prompt({
        type: "input",
        message: "enter department name",
        name: "dept"
      })
      //inserts input into deparmtent
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
// function to add role
  function addRole() {
    //gets input from user
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
      //inserts input into database
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
  // function to add employee
  function addEmployee() {
    //gets input from user
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
        //inserrts input into database
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
            console.table(answer);
            // runSearch();
          }    
        )
        runSearch();
         
      });  
  }
  //function that is supposed to update employee
  function updateEmployee() {
    connection.query("SELECT * FROM employees", function(err, results) {
      if (err) throw err;
      const choices = results.map(item => item.last_name);
      inquirer
      .prompt([
        {
        name: "choice",
        type: "rawlist",
        choices: choices,
        messge: "Which employee would you like to update"
        },
        {
          name: "roleid",
          type:"input",
          message: "What role id would you like to give them"

        }
      ])
      .then(function(answer) {
        const chosenItem = results.find(item => item.last_name === answer.choice)
        connection.query(
          "UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: answer.roleid
            },
            {
              id: chosenItem.id
            }

          ],
         
        );
      });runSearch();
    });
  }
