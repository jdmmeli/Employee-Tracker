INSERT INTO department (name)
VALUES ("Accounting"),
("Sales"),
("Warehouse"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Accountant", 75.5, 1),
("Lead Accountant", 95.7, 1),
("Salesman", 45.3, 2),
("Lead Salesman", 55.2, 2),
("Supervisor", 40.0, 3),
("Associate", 30.3, 3),
("Lawyer", 120.1, 4),
("Lead Counsel", 150.1, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Ned", "Reyerson" 1, 1),
("Archimedes", "Johnson", 1, 1),
("SLick", "McSLickson", 2, 2),
("Bubba", "Jumpson", 2, 2),
("Johnny", "SMockers", 3, 3),
("Jimbo", "Smithers", 3, 3),
("Legal", "Eagle", 4, 4),
("Daddy", "Warbucks", 4, 4);

