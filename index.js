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
    var query = `SELECT
                e1.id AS "ID",
                e1.first_name AS "First Name",
                e1.last_name AS "Last Name",
                r.title AS "Title",
                d.name AS "Department",
                r.salary AS "Salary",
                e2.first_name AS "Manager First Name",
                e2.last_name AS "Manager Last Name"
                FROM employee e1
                JOIN role r
                    on e1.role_id = r.id
                JOIN department d
                    on r.department_id = d.id
                LEFT JOIN employee e2
                    on e1.manager_id = e2.id`;
    conn.query(query, function (err, data) {
        if (err) throw err;
        for (var i = 0; i<data.length; i++) {
            if(data[i].Manager == null) {
                data[i].Manager = "None";
            }
        }
        console.table(data);
        init();
    })
};

////////////////////////////////  View All Employees By Selected Department  ///////////////////////////////////////////////////

function viewEmpDeps() {
    inquirer.prompt(
        {
            type: "list",
            name: "department",
            message: "Which department would you like to choose?",
            choices: depOptions
        }
    )

    .then(function(answer) {
        var query =`SELECT
                    e1.id AS "ID",
                    e1.first_name AS "First Name",
                    e1.last_name AS "Last Name",
                    r.title AS "Title",
                    d.name AS "Department",
                    r.salary AS "Salary",
                    e2.first_name AS "Manager First Name",
                    e2.last_name AS "Manager Last Name"
                    from department d
                    join role r
                        on r.department_id = d.id
                    join employee e1
                        on e1.role_id = r.id
                    left join employee e2
                        on e1.manager_id = e2.id
                        WHERE name = ?`;
        conn.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        })
    });
};

var depOptions = [];

function viewEmpDep() {
    const query = `SELECT name FROM department`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        depOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].name
            depOptions.push(dep);
        }
         viewEmpDeps();
    })
 }

//////////////////////////  View All Employees By Selected Manager  ////////////////////////////////////

function viewEmpMans() {
    inquirer.prompt(
        {
            type: "list",
            name: "manager",
            message: "Which manager would you like to choose?",
            choices: manaOptions
        }
    )
    .then(function(answer) {
        const first = answer.manager.split(" ")[0];
        const last = answer.manager.split(" ")[1];
        var query = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
        conn.query(query, [first, last], (err, res) => {
            if (err) throw err;

            query =`SELECT employee.id AS 'ID', 
                    first_name AS 'First Name', 
                    last_name AS 'Last Name', 
                    role.title AS 'Title', 
                    department.name AS 'Department', 
                    role.salary AS 'Salary', 
                    manager_id
                    FROM employee, role, department
                    WHERE manager_id = ? AND employee.role_id = role.id
                    AND role.department_id = department.id
                    ORDER BY employee.id ASC`
                    conn.query(query, [res[0].id], (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        init();
                    })
        })
    });
};


var manaOptions = [];

function viewEmpMan() {
    const query = `SELECT first_name, last_name FROM employee`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        manaOptions = [];
        for (var i = 0; i < res.length; i++) {
            const mana = res[i].first_name + " " + res[i].last_name;
            manaOptions.push(mana);
        }
         viewEmpMans();
    })
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



