const { response } = require('express')
const {Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'lalit123',
  port: 9191,
})

const getEmpById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM EMPLOYEES WHERE id = $1;', [id], (error, results) => {
      if (error) {
        console.log("Error while retrieving employee by ID: ", id);
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const createEmp = (request, response) => {
    const { id, name, age, address, salary, doj, dept_id } = request.body
    console.log("Payload", [id, name, age, address, salary, doj, dept_id] );
    pool.query('insert into employees values ($1, $2, $3, $4, $5, $6,$7)', [id, name, age, address, salary, doj, dept_id], (error, results) => {
        if (error) {
            throw error
        }
        console.log("results", results);
        response.status(201).send(`User added with ID: ${id}`)
    })
}

const getEmpByDept =(request, response)=> {
    const dept_id= parseInt(request.query.dept_id);

    const {start_date, end_date} = request.query;

    pool.query ('select * from employees where dept_id = $1 and doj between $2 and $3 order by doj desc;',[dept_id, start_date, end_date], (error, results) => { if (error) {
        throw error
    }
    response.status(200).json(results.rows);
})
}


  module.exports = {
    // getUsers,
    getEmpById,
    getEmpByDept,
    createEmp,
    // updateUser,
    // deleteUser,
  }