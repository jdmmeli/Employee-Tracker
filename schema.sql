DROP DATABASE IF EXISTS employee_DB;
-- creates database
CREATE DATABASE employee_DB;
-- specifies which database to use
USE employee_DB;
-- creates tables
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

-- 

