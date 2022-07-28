const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8084

var path = require('path');
const indexRouter = require('./routes/index')
const employeesRouter= require('./routes/employees')
const db = require('./util/queries');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/employees/:id',db.getEmpById);
app.post('/employees', db.createEmp);
app.get('/employeesByDept', db.getEmpByDept);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})