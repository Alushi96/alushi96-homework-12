#DROP DATABASE IF EXISTS employee_management_DB;

CREATE DATABASE employee_management_DB;

USE employee_management_DB;

CREATE TABLE department (
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id)
);

insert into department (name) values ("Sales");
insert into department (name) values ("HR");
insert into department (name) values ("Marketing");
insert into department (name) values ("Customer Service");
select*from department;

insert into role (title, salary, department_id) values ("Sales Leader", 200000, 1);
insert into role (title, salary, department_id) values ("HR Representative", 85000, 2);
insert into role (title, salary, department_id) values ("Social Media", 120000, 3);
insert into role (title, salary, department_id) values ("Customer Information", 55000, 4);
select*from role;

insert into employee (first_name, last_name, role_id) values ("Ali", "Jaber", 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Adam", "Merheb", 2, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Hashish", "Jabarki", 3, 4);
insert into employee (id, first_name, last_name, role_id, manager_id) values (5,"Sarah", "Hamadia", 4, 2);
select*from employee;
