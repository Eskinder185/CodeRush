import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const sqlTrack: LanguageTrack = {
  "language": "sql",
  "languageName": "SQL",
  "description": "Query language for relational databases.",
  "lessons": [
    {
      "id": "sql-basics-1",
      "title": "Basic Queries and Tables",
      "description": "Learn fundamental SQL syntax with SELECT statements and table creation",
      "difficulty": "beginner",
      "code": "-- Create a sample database table\nCREATE TABLE employees (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50) NOT NULL,\n    email VARCHAR(100) UNIQUE,\n    department VARCHAR(50),\n    salary DECIMAL(10, 2),\n    hire_date DATE\n);\n\n-- Insert sample data\nINSERT INTO employees (first_name, last_name, email, department, salary, hire_date) VALUES\n('John', 'Doe', 'john.doe@company.com', 'Engineering', 75000.00, '2023-01-15'),\n('Jane', 'Smith', 'jane.smith@company.com', 'Marketing', 65000.00, '2023-02-20'),\n('Bob', 'Johnson', 'bob.johnson@company.com', 'Engineering', 80000.00, '2022-11-10'),\n('Alice', 'Brown', 'alice.brown@company.com', 'HR', 60000.00, '2023-03-05'),\n('Charlie', 'Wilson', 'charlie.wilson@company.com', 'Engineering', 70000.00, '2023-01-30');\n\n-- Basic SELECT queries\nSELECT * FROM employees;\n\nSELECT first_name, last_name, department \nFROM employees;\n\nSELECT first_name, last_name, salary \nFROM employees \nWHERE salary > 70000;\n\nSELECT department, COUNT(*) as employee_count\nFROM employees \nGROUP BY department;",
      "expectedTime": 10,
      "concepts": [
        "CREATE TABLE",
        "INSERT",
        "SELECT",
        "WHERE",
        "GROUP BY"
      ]
    },
    {
      "id": "sql-basics-2",
      "title": "Joins and Relationships",
      "description": "Master table relationships and JOIN operations",
      "difficulty": "beginner",
      "code": "-- Create related tables\nCREATE TABLE departments (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(50) NOT NULL,\n    manager_id INT,\n    budget DECIMAL(12, 2)\n);\n\nCREATE TABLE projects (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(100) NOT NULL,\n    department_id INT,\n    start_date DATE,\n    end_date DATE,\n    budget DECIMAL(10, 2),\n    FOREIGN KEY (department_id) REFERENCES departments(id)\n);\n\n-- Insert sample data\nINSERT INTO departments (name, manager_id, budget) VALUES\n('Engineering', 1, 500000.00),\n('Marketing', 2, 200000.00),\n('HR', 4, 100000.00);\n\nINSERT INTO projects (name, department_id, start_date, end_date, budget) VALUES\n('Website Redesign', 1, '2023-01-01', '2023-06-30', 50000.00),\n('Mobile App', 1, '2023-02-01', '2023-08-31', 75000.00),\n('Brand Campaign', 2, '2023-03-01', '2023-05-31', 30000.00),\n('Employee Training', 3, '2023-04-01', '2023-07-31', 15000.00);\n\n-- INNER JOIN\nSELECT e.first_name, e.last_name, d.name as department_name\nFROM employees e\nINNER JOIN departments d ON e.department = d.name;\n\n-- LEFT JOIN\nSELECT d.name as department_name, p.name as project_name\nFROM departments d\nLEFT JOIN projects p ON d.id = p.department_id;\n\n-- Multiple table JOIN\nSELECT e.first_name, e.last_name, d.name as department, p.name as project\nFROM employees e\nINNER JOIN departments d ON e.department = d.name\nLEFT JOIN projects p ON d.id = p.department_id;",
      "expectedTime": 12,
      "concepts": [
        "FOREIGN KEY",
        "INNER JOIN",
        "LEFT JOIN",
        "table relationships"
      ]
    },
    {
      "id": "sql-intermediate-1",
      "title": "Aggregate Functions and Subqueries",
      "description": "Use aggregate functions and nested queries for complex data analysis",
      "difficulty": "intermediate",
      "code": "-- Aggregate functions\nSELECT \n    department,\n    COUNT(*) as employee_count,\n    AVG(salary) as average_salary,\n    MAX(salary) as highest_salary,\n    MIN(salary) as lowest_salary,\n    SUM(salary) as total_salary\nFROM employees \nGROUP BY department\nHAVING COUNT(*) > 1;\n\n-- Subqueries\nSELECT first_name, last_name, salary\nFROM employees \nWHERE salary > (\n    SELECT AVG(salary) \n    FROM employees\n);\n\n-- EXISTS subquery\nSELECT d.name as department_name\nFROM departments d\nWHERE EXISTS (\n    SELECT 1 \n    FROM projects p \n    WHERE p.department_id = d.id\n);\n\n-- IN subquery\nSELECT first_name, last_name\nFROM employees\nWHERE department IN (\n    SELECT name \n    FROM departments \n    WHERE budget > 150000\n);\n\n-- Correlated subquery\nSELECT e.first_name, e.last_name, e.salary\nFROM employees e\nWHERE e.salary = (\n    SELECT MAX(salary)\n    FROM employees e2\n    WHERE e2.department = e.department\n);",
      "expectedTime": 12,
      "concepts": [
        "aggregate functions",
        "subqueries",
        "EXISTS",
        "HAVING",
        "correlated subqueries"
      ]
    },
    {
      "id": "sql-intermediate-2",
      "title": "Data Modification and Transactions",
      "description": "Update, delete data and manage database transactions",
      "difficulty": "intermediate",
      "code": "-- UPDATE statements\nUPDATE employees \nSET salary = salary * 1.1 \nWHERE department = 'Engineering';\n\nUPDATE employees \nSET email = CONCAT(LOWER(first_name), '.', LOWER(last_name), '@company.com')\nWHERE email IS NULL;\n\n-- DELETE statements\nDELETE FROM projects \nWHERE end_date < '2023-01-01';\n\n-- Transactions\nSTART TRANSACTION;\n\nINSERT INTO employees (first_name, last_name, email, department, salary, hire_date) \nVALUES ('New', 'Employee', 'new.employee@company.com', 'Engineering', 65000.00, '2023-12-01');\n\nUPDATE departments \nSET budget = budget - 65000 \nWHERE name = 'Engineering';\n\n-- Rollback if needed (uncomment to test)\n-- ROLLBACK;\n\n-- Commit the transaction\nCOMMIT;\n\n-- Conditional updates with CASE\nUPDATE employees \nSET salary = CASE \n    WHEN department = 'Engineering' THEN salary * 1.15\n    WHEN department = 'Marketing' THEN salary * 1.10\n    ELSE salary * 1.05\nEND;\n\n-- Safe DELETE with JOIN\nDELETE e FROM employees e\nLEFT JOIN projects p ON e.department = (\n    SELECT name FROM departments WHERE id = p.department_id\n)\nWHERE p.id IS NULL AND e.hire_date < '2022-01-01';",
      "expectedTime": 10,
      "concepts": [
        "UPDATE",
        "DELETE",
        "transactions",
        "COMMIT",
        "ROLLBACK",
        "CASE statements"
      ]
    },
    {
      "id": "sql-advanced-1",
      "title": "Advanced Queries and Window Functions",
      "description": "Complex queries with window functions and advanced SQL features",
      "difficulty": "advanced",
      "code": "-- Window functions\nSELECT \n    first_name,\n    last_name,\n    department,\n    salary,\n    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,\n    RANK() OVER (ORDER BY salary DESC) as overall_rank,\n    DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank,\n    LAG(salary, 1) OVER (PARTITION BY department ORDER BY salary) as prev_salary,\n    LEAD(salary, 1) OVER (PARTITION BY department ORDER BY salary) as next_salary,\n    AVG(salary) OVER (PARTITION BY department) as dept_avg_salary\nFROM employees;\n\n-- Common Table Expressions (CTEs)\nWITH department_stats AS (\n    SELECT \n        department,\n        COUNT(*) as emp_count,\n        AVG(salary) as avg_salary\n    FROM employees\n    GROUP BY department\n),\nhigh_performers AS (\n    SELECT e.*, ds.avg_salary\n    FROM employees e\n    JOIN department_stats ds ON e.department = ds.department\n    WHERE e.salary > ds.avg_salary * 1.2\n)\nSELECT \n    hp.first_name,\n    hp.last_name,\n    hp.department,\n    hp.salary,\n    hp.avg_salary,\n    ROUND((hp.salary - hp.avg_salary) / hp.avg_salary * 100, 2) as salary_premium_pct\nFROM high_performers hp;\n\n-- Recursive CTE\nWITH RECURSIVE employee_hierarchy AS (\n    -- Base case: employees with no manager\n    SELECT id, first_name, last_name, 0 as level\n    FROM employees \n    WHERE id IN (SELECT manager_id FROM departments WHERE manager_id IS NOT NULL)\n    \n    UNION ALL\n    \n    -- Recursive case: employees reporting to managers\n    SELECT e.id, e.first_name, e.last_name, eh.level + 1\n    FROM employees e\n    JOIN employee_hierarchy eh ON e.id = eh.id\n    WHERE eh.level < 3\n)\nSELECT * FROM employee_hierarchy ORDER BY level, last_name;",
      "expectedTime": 15,
      "concepts": [
        "window functions",
        "CTEs",
        "recursive queries",
        "ROW_NUMBER",
        "RANK",
        "LAG/LEAD"
      ]
    }
  ]
}
