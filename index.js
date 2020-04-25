const inquirer = require("inquirer");
const mysql = require("mysql");

/*var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "",
    database: "employee_DB"
});

connection.connect(err => { 
    if (err) throw err;
    init();
});*/

function init(){
    inquirer.prompt({
        type: "list",
        name: "choice",
        meesage: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee", 
            "Remove Employee", 
            "Update Employee Role", 
            "Update Employee Manager",
            "View All Roles",
            "Exit"
        ]
    })
    .then(function(answer) {
            switch (answer.choice) {
                case "View All Employees":
                    viewEmp();
                    break;

                case "View All Employees By Department":
                    viewEmpDep();
                    break;

                case "View All Employees By Manager":
                    viewEmpMan();
                    break;

                case "Add Employee":
                    addEmp();
                    break;

                case "Remove Employee":
                    remEmp();
                    break;

                case "Update Employee Role":
                    upEmpRole();
                    break;

                case "Update Employee Manager":
                    upEmpMan();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function viewEmp() {
    console.log("View Employees");
    init();
};

function viewEmpDep() {
    console.log("View All Employees By Department");
    init();
};

function viewEmpMan() {
    console.log("View All Employees By Manager");
    init();
};

function addEmp() {
    console.log("Add Employee");
    init();
};

function remEmp() {
    console.log("Remove Employee");
    init();
};

function upEmpRole() {
    console.log("Update Employee Role");
    init();
};

function upEmpMan() {
    console.log("Update Employee Manager");
    init();
};

function viewAllRoles() {
    console.log("View All Roles");
    init();
};

init();