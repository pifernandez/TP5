const express = require('express')
const logger = require('morgan')
<<<<<<< HEAD
const cors = require('cors');
const bodyParser = require('body-parser');
=======
const cors = require('cors')
const bodyParser = require('body-parser')

>>>>>>> fc6e695ec7c8794947e004622850463d399ed11c
const router = require('./modules/router')

const server = express()
const port = 3000

server.use(
	bodyParser.urlencoded({
		extended: true
	})
);
server.use(bodyParser.json());
<<<<<<< HEAD

server.use(router)
server.use('/assets', express.static('public'));
server.use(logger('dev'))
server.use(cors);

=======
server.use(logger('dev'));
server.use('/assets', express.static('public'));
server.use(router);
server.use(cors);
>>>>>>> fc6e695ec7c8794947e004622850463d399ed11c

server.listen(port, () => {
    console.log(`running on port ${port}`)
})