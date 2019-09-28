const express = require('express')
const path = require('path')
const employees = require('../api/employees')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'))
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'))
})

router.get('/api/employees', employees.getEmp);
router.get('/api/employees/:id', employees.getEmpByid);
router.post('/api/employees', employees.postEmp);
router.patch('/api/employees', employees.patchEmp);

router.use((req, res) => {
	res.status(404).send('Error 404');
});

module.exports = router