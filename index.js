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
    const query = `SELECT name FROM department`;
    conn.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
}

 //////////////////////////  View All Roles  ////////////////////////////////////////////////////////

 function viewAllRoles() {
    const query = `SELECT role.title FROM role`;
    conn.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
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
               console.log(role);
   
               
   
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
               console.log(man);
                   query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                   conn.query(query, [answer.first, answer.last, role, man], err => {
                   if (err) throw err;
                   init();
                   });
               })
               }
               
           })
       });
   };
   
   var rolOptions = [];
   var manOptions = [];
   
   function addEmp() {
       viewRL();
       viewEMPSM();
   }
   
   
   function viewRL() {
      const query = `SELECT title FROM role`;
      conn.query(query, function(err, res) {
          if (err) throw err;
          rolOptions = [];
          for (var i = 0; i < res.length; i++) { 
              const rol = res[i].title
              rolOptions.push(rol);
          }
      })
   }
   
   function viewEMPSM() {
       const query = `SELECT first_name, last_name FROM employee`;
       conn.query(query, function(err, res) {
           if (err) throw err;
           manOptions = ["None"];
           for (var i = 0; i < res.length; i++) {
               const dep = res[i].first_name + " " + res[i].last_name;
               manOptions.push(dep);
           }
           addEmps();
       })
    }
   

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
        })
    })
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



