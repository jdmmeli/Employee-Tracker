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
    database: "employee_db"
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
                "Update departments",
                "Update roles",
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

                case "Update Departments":
                    updateDepartments();
                    break;

                case "Update Roles":
                    updateRoles();
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
