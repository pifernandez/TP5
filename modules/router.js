const express = require('express')
const path = require('path')
const employees = require('../api/employees')
const router = express.Router()

//PAGES ROUTES
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'))
})

//API ROUTES
router.get('/api/employees', employees.getEmp)
router.get('/api/employees/:id', employees.getEmpById);
router.patch('api/employees', employees.patchEmp)
router.post('/api/employees', employees.postEmp);

//NOT FOUNS HANDLER
router.use((req, res) => {
    res.status(404).send('Error 404 not found')
})

module.exports = router