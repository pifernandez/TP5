const express = require('express')
const logger = require('morgan')
const router = require('./modules/router')
const server = express()
const port = 3000

server.use(router)
server.use(express.static('public'))
server.use(logger('dev'))

server.listen(port, () => {
    console.log(`running on ${port}`)
})