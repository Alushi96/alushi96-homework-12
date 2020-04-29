const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");
const cTable = require("console.table");

var depOptions = [];
var manaOptions = [];
var rolOptions = [];
var manOptions = [];
var empOptions=[];

var conn = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "",
    database: "employee_management_DB"
});

conn.connect(err => { 
    if (err) throw err;
    figlet("Employee Manager", function(err, data) {
        if (err) throw err;
        console.log(data);
        init();
    });
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
            "Remove Role", 
            "Remove Department",
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

                case "Remove Role":
                    remRole();
                    break;

                case "Remove Department":
                    remDep();
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
                    ON e1.role_id = r.id
                JOIN department d
                    ON r.department_id = d.id
                LEFT JOIN employee e2
                    ON e1.manager_id = e2.id`;
    conn.query(query, (err, data) => {
        if (err) throw err;
<<<<<<< HEAD
=======
        // for (var i = 0; i<data.length; i++) {
        //     if(data[i].Manager == null) {
        //         data[i].Manager = "None";
        //     }
        // }
>>>>>>> b39735de68c25a8db5a7f3fdf7f77f1bf9fcb7c6
        console.table(data);
        init();
    });
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
                    FROM department d
                    JOIN role r
                        ON r.department_id = d.id
                    JOIN employee e1
                        ON e1.role_id = r.id
                    LEFT JOIN employee e2
                        ON e1.manager_id = e2.id
                    WHERE name = ?`;
        conn.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        });
    });
};

function viewEmpDep() {
    const query = `SELECT name FROM department`;
    conn.query(query, (err, res) => {
        if (err) throw err;
        depOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].name;
            depOptions.push(dep);
        };
         viewEmpDeps();
    });
 };

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
<<<<<<< HEAD
            query =`SELECT
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
                        ON e1.role_id = r.id
                    JOIN department d
                        ON r.department_id = d.id
                    LEFT JOIN employee e2
                        ON e1.manager_id = e2.id
                    WHERE e1.manager_id = ?`
=======

            query =`SELECT
                    e1.id AS "ID",
                    e1.first_name AS "First Name",
                    e1.last_name AS "Last Name",
                    r.title AS "Title",
                    d.name AS "Department",
                    r.salary AS "Salary",
                    e2.first_name AS "Manager First Name",
                    e2.last_name AS "Manager Last Name"
                    from employee e1
                    join role r
                        on e1.role_id = r.id
                    join department d
                        on r.department_id = d.id
                    left join employee e2
                        on e1.manager_id = e2.id
                        WHERE e1.manager_id = ?`
>>>>>>> b39735de68c25a8db5a7f3fdf7f77f1bf9fcb7c6
                    conn.query(query, [res[0].id], (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        init();
                    });
        });
    });
};

function viewEmpMan() {
    const query = `SELECT first_name, last_name FROM employee`;
    conn.query(query, (err, res) => {
        if (err) throw err;
        manaOptions = [];
        for (var i = 0; i < res.length; i++) {
            const mana = res[i].first_name + " " + res[i].last_name;
            manaOptions.push(mana);
        };
         viewEmpMans();
    });
 };

 /////////////////////////  View All Depratments  //////////////////////////////////////////////

 function viewDep() {
    const query = `SELECT name FROM department`;
    conn.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

 //////////////////////////  View All Roles  ////////////////////////////////////////////////////////

 function viewAllRoles() {
    const query = `SELECT role.title FROM role`;
    conn.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
};

//////////////////////////  Add An Employee To The Database  /////////////////////////////////////

function addEmps() {
    inquirer.prompt([
           {
               type: "input",
               name: "first",
               message: "What is the employee's first name?"
           },
           {
               type: "input",
               name: "last",
               message: "What is the employee's last name?"
           },
           {
               type: "list",
               name: "role",
               message: "What is the employee's role?",
               choices: rolOptions
           },
           {
               type: "list",
               name: "manager",
               message: "Who is the employee's manager?",
               choices: manOptions
           }
       ])
       .then(function(answer) {
           var query = `SELECT id FROM role WHERE title = ?`;
           conn.query(query, [answer.role], (err, res) => {
               if (err) throw err;
               let role;
               role = res[0].id;
                   if (answer.manager === "None") {
                        query = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`;
                        conn.query(query, [answer.first, answer.last, role], err => {
                        if (err) throw err;
                        init();
                        });
               }
               else {
                    const first = answer.manager.split(" ")[0];
                    const last = answer.manager.split(" ")[1];
                    let man;
                    query = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
                    conn.query(query, [first, last], (err, res) => {
                        if (err) throw err;
                        man = res[0].id;
                        query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                        conn.query(query, [answer.first, answer.last, role, man], err => {
                            if (err) throw err;
                            init();
                        });
                    });
                }  
            });
        });
};
   
function addEmp() {
   viewRL();
   viewEMPSM();
};
   
   
function viewRL() {
    const query = `SELECT title FROM role`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        rolOptions = [];
        for (var i = 0; i < res.length; i++) { 
            const rol = res[i].title
            rolOptions.push(rol);
        };
    });
};
   
function viewEMPSM() {
    const query = `SELECT first_name, last_name FROM employee`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        manOptions = ["None"];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].first_name + " " + res[i].last_name;
            manOptions.push(dep);
        };
        addEmps();
    });
};
   

////////////////////////////////  Add A Department To Database  /////////////////////////////////////////////////

function addDep() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?"
        }
    ])
    .then(function(answers) {
        const query = `INSERT INTO department (name) VALUES (?)`;
        conn.query(query, [answers.name], err => {
            if (err) throw err;
            init();
        });
    });
};

///////////////////////////////// Add A Role To Database  /////////////////////////////////////////////////

function addRoles() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What salary would you like to add?"
        },
        {
            type: "list",
            name: "department",
            message: "Under which department would you like to add this role?",
            choices: depOptions
        }
    ])
    .then(function(answers) {
        var query = `Select id FROM department Where name = ?`;
        conn.query(query, [answers.department], (err, data) => {
            if (err) throw err;
            query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
            conn.query(query, [answers.title, answers.salary, data[0].id], err => {
                if (err) throw err;
                init();
            });
        });
    });
};

function addRole() {
    const query = `SELECT name FROM department`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        depOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].name;
            depOptions.push(dep);
        };
        addRoles();
    });
};

 ///////////////////////////////  Remove Employee From Database   //////////////////////////////////////////////////////////

 function remEmps() {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee would you like to remove?",
            choices: manOptions
        }
    ])
    .then(function(answer) {
        const first = answer.employee.split(" ")[0];
        const last = answer.employee.split(" ")[1];
        var query = `DELETE FROM employee WHERE first_name = ? AND last_name = ?`;
        conn.query(query, [first, last], (err, data) => {
            if (err) throw err;
            init();
        });
    });
};

function remEmp() {
    const query = `SELECT first_name, last_name FROM employee`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        manOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].first_name + " " + res[i].last_name;
            manOptions.push(dep);
        }
        remEmps();
    });
};

/////////////////////////////////////////  Remove Role From Database  //////////////////////////////////////////////

function remRoles() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Which employee would you like to remove?",
            choices: rolOptions
        }
    ])
    .then(function(answer) {
        var query = `DELETE FROM role WHERE title = ?`;
        conn.query(query, [answer.role], (err, data) => {
            if (err) throw err;
            init();
        });
    });
};

function remRole() {
    const query = `SELECT title FROM role`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        rolOptions = [];
        for (var i = 0; i < res.length; i++) { 
            const rol = res[i].title
            rolOptions.push(rol);
        };
        remRoles();
    });
};

 ////////////////////////////////////////  Remove Department From Database  /////////////////////////////////////////

function remDeps() {
    inquirer.prompt([
        {
            type: "list",
            name: "depart",
            message: "Which employee would you like to remove?",
            choices: depOptions
        }
    ])
    .then(function(answer) {
        var query = `DELETE FROM department WHERE name = ?`;
        conn.query(query, [answer.depart], (err, data) => {
            if (err) throw err;
            init();
        });
    });
};

function remDep() {
    const query = `SELECT name FROM department`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        depOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].name;
            depOptions.push(dep);
        };
        remDeps();
    });
};

 ////////////////////////////////////////  Remove Department From Database  /////////////////////////////////////////

 function remDeps() {
    inquirer.prompt([
        {
            type: "list",
            name: "depart",
            message: "Which employee would you like to remove?",
            choices: depOptions
        }
    ])
    .then(function(answer) {
        var query = `DELETE FROM department WHERE name = ?`;
        conn.query(query, [answer.depart], (err, data) => {
            if (err) throw err;
            init();

        })   
    })
 };

 function remDep() {
    const query = `SELECT name FROM department`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        depOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].name
            depOptions.push(dep);
        }
         remDeps();
    })
 }

/////////////////////////////////////////  Update Employee Role  ////////////////////////////////////////////////////

function upEmpRoles() {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update their role?",
            choices: manOptions
        },
        {
            type: "list",
            name: "role",
            message: "What role would you like to choose?",
            choices: rolOptions
        }
    ])
    .then(function(answers) {
        const first = answers.employee.split(" ")[0];
        const last = answers.employee.split(" ")[1];
        var query = `Select id FROM role WHERE title = ?`;
        conn.query(query, [answers.role], (err, data) => {
            if (err) throw err;
            query = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
            conn.query(query, [data[0].id, first, last], (err, res) => {
                if (err) throw err;
                init();
            });
        });
    });
};

function upEmpRole() {
    const query = `SELECT first_name, last_name FROM employee`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        manOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].first_name + " " + res[i].last_name;
            manOptions.push(dep);
        };
        UpRL();  
    });
};

function UpRL() {
    const query = `SELECT title FROM role`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        rolOptions = [];
        for (var i = 0; i < res.length; i++) { 
            const rol = res[i].title;
            rolOptions.push(rol);
        };
        upEmpRoles();
    });
};

//////////////////////////////////////  Update Employee Manager  ///////////////////////////////////////////////////////////

function upEmpMans() {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update thier manager?",
            choices: empOptions
        },
        {
            type:"list",
            name: "manager",
            message: "Who would you like to set as thier manager?",
            choices:manOptions
        }
    ])
    .then(function(answers) {
        const first = answers.manager.split(" ")[0];
        const last = answers.manager.split(" ")[1];
        const firste = answers.employee.split(" ")[0];
        const laste = answers.employee.split(" ")[1];
        var query = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
        conn.query(query, [first, last], (err,data) => {
            if(err) throw err;

            if (answers.manager !== "None") {
                query = `UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?`;
                conn.query(query, [data[0].id, firste, laste], (err, res) => {
                    if (err) throw err;
                    init();
                });
            }
            else {
                query = `UPDATE employee SET manager_id = null WHERE first_name = ? AND last_name = ?`;
                conn.query(query, [firste, laste], (err, res) => {
                    if (err) throw err;
                    init();
                });
            }
        });
    });
};

function upEmpMan() {
    const query = `SELECT first_name, last_name FROM employee`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        empOptions = [];
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].first_name + " " + res[i].last_name;
            empOptions.push(dep);
        };
        upMan();
    });
};

function upMan() {
    const query = `SELECT first_name, last_name FROM employee`;
    conn.query(query, function(err, res) {
        if (err) throw err;
        manOptions = ["None"]
        for (var i = 0; i < res.length; i++) {
            const dep = res[i].first_name + " " + res[i].last_name;
            manOptions.push(dep);
        }
        upEmpMans();
    });
};