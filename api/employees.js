const employees = [{
    nombre: 'Ada',
    apellido: 'Lovelace',
    telefono: '1234567890',
    email: 'contacto@gmail.com'
  }, {
    nombre: 'Grace',
    apellido: 'Hopper',
    telefono: '087654321',
    email: 'contacto@hotmail.com'
  }
]

const getEmp = (req, res, next) => {
    console.log('Pidiendo empleados')
    res.status(200).json({ employees })
    next()
}

const patchEmp = (req, res, next) => {
	let data = req.body;
	let index = '';
	let resEmp = employees.find((e, i) => {
		index = i;
		return e.id === req.params.id;
	});

	if (resEmp) {
		let editedEmp = { ...resEmp, ...data };
		user.splice(1, index);
		user.push(editedEmp);
	} else {
		res.status(404).send('no encontramos al empleado');
	}
};

const postEmp = (req, res, next) => {
	let data = req.body;
	if (data.hasOwnProperty('name') && data.hasOwnProperty('email')) {
		data.id = users.length + 1; // para el tp, pongamos una generación de ID mas segura.
		users.push(data);
		res.status('201').json(`recibido con el id ${data.id}`);
	} else {
		res.status('400').json('fijate que pusiste mal los datos, ameo.');
	}
	next();
};

const getEmpByid = (req, res, next) => {
	let resEmp = employees.find((e) => e.id === req.params.id);
	if (resEmp) {
		res.status(200).json(resEmp);
	} else {
		res.status(404).send('no encontramos al usuario');
	}
};

module.exports = { getEmp, getEmpByid, patchEmp, postEmp }