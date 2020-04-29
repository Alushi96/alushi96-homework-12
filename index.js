const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var conn = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "",
    database: "employee_management_DB"
});

conn.connect(err => { 
    if (err) throw err;
    init();
});

function init(){
    inquirer.prompt({
        type: "list",
        name: "choice",
        meesage: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add A Department",
            "Add A Role", 
            "Remove Employee", 
            "Update Employee Role", 
            "Update Employee Manager",
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

                case "View All Departments":
                    viewDep();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":
                    addEmp();
                    break;

                case "Add A Department":
                    addDep();
                    break;

                case "Add A Role":
                    addRole();
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

                case "Exit":
                    conn.end();
                    break;
            }
        });
};



/////////////////////  View All Employess In Database  ////////////////////////////////

function viewEmp() {

};

////////////////////////////////  View All Employees By Selected Department  ///////////////////////////////////////////////////

function viewEmpDep() {

 }

//////////////////////////  View All Employees By Selected Manager  ////////////////////////////////////

function viewEmpMan() {

 }

 /////////////////////////  View All Depratments  //////////////////////////////////////////////

 function viewDep() {

 }

 //////////////////////////  View All Roles  ////////////////////////////////////////////////////////

 function viewAllRoles() {

};

//////////////////////////  Add An Employee To The Database  /////////////////////////////////////

function addEmp() {

}

////////////////////////////////  Add A Department To Database  /////////////////////////////////////////////////

function addDep() {

}


///////////////////////////////// Add A Role To Database  /////////////////////////////////////////////////

function addRole() {
 
 }

 ///////////////////////////////  Remove Employee From Database   //////////////////////////////////////////////////////////

function remEmp() {

}

/////////////////////////////////////////  Update Employee Role  ////////////////////////////////////////////////////

function upEmpRole() {

}

//////////////////////////////////////  Update Employee Manager  ///////////////////////////////////////////////////////////
function upEmpMan(){

}

///////////////////////////////////////  View All Roles In Database  /////////////////////////////////////////////////////////



