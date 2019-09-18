const express = require('express')
const path = require('path')
const employees = require('./employees')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'))
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'))
})

router.get('/api/users', employees)

module.exports = router