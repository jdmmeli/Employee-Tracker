DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) Not NULL,
  salary DECIMAL(10, 4) Not NULL,
  department_id INT Not NULL,
  PRIMARY KEY (id)
   FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) Not NULL,
  last_name VARCHAR(30) Not NULL,
  role_id INT Not NULL,
  manager_id INT,
  PRIMARY KEY (id)
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- INSERT INTO department (name)
-- VALUES ("Accounting", "Sales", "Warehouse", "Legal");

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Accountant", 75.5, 1),
-- ("Lead Accountant", 95.7, 1),
-- ("Salesman", 45.3, 2),
-- ("Lead Salesman", 55.2, 2),
-- ("Supervisor", 40.0, 3),
-- ("Associate", 30.3, 3),
-- ("Lawyer", 120.1, 4),
-- ("Lead Counsel", 150.1, 4);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Ned", "Reyerson" 1, 1),
-- ("Archimedes", "Johnson", 1, 1),
-- ("SLick", "McSLickson", 2, 2),
-- ("Bubba", "Jumpson", 2, 2),
-- ("Johnny", "SMockers", 3, 3),
-- ("Jimbo", "Smithers", 3, 3),
-- ("Legal", "Eagle", 4, 4),
-- ("Daddy", "Warbucks", 4, 4);
