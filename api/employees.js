const employees = [{
    name: 'Ada',
	lastName: 'Lovelace',
	address: 'calle 123',
    phone: '1234567890',
	email: 'contacto@gmail.com',
	id: 1
  }, {
    name: 'Grace',
	lastName: 'Hopper',
	address: 'calle 456',
    phone: '087654321',
	email: 'contacto@hotmail.com',
	id: 2
  }]

const getEmp = (req, res, next) => {
	res.json({ employees });
	next();
};

const patchEmp = (req, res, next) => {
	let data = req.body;
	let index = '';
	let resEmp = employees.find((e, i) => {
		index = i;
		return e.id === req.params.id;
	});

	if (resEmp) {
		let editedEmp = { ...resEmp, ...data };
		employees.splice(1, index);
		employees.push(editedEmp);
	} else {
		res.status(404).send('no encontramos al empleado');
	}
};

const postEmp = (req, res, next) => {
	let data = req.body;
	data.id = employees.length + 1;
	employees.push(data);
	res.status('201').json(`empleado recibido con el id ${data.id}`);
	next();
};

const deleteEmp = (req, res, next) => {
	let data = req.body;
	let index = '';
	let resEmp = employees.find((e, i) => {
		index = i;
		return e.id === req.params.id;
	});

	if (resEmp) {
		employees.splice(1, index);
	} else {
		res.status(404).send(`se elimino al empleado con el id ${data.id}`);
	}
}

const getEmpByid = (req, res, next) => {
	let resEmp = employees.find((e) => e.id === req.params.id);
	if (resEmp) {
		res.json(resEmp);
	} else {
		res.status(404).send('no encontramos al empleado');
	}
};

module.exports = { getEmp, getEmpByid, patchEmp, postEmp, deleteEmp };
