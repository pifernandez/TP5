const employees = [
	{
		name: 'Ada',
		lastName: 'Lovelace',
		address: 'Calle falsa 123',
		email: 'ada@lovelace.com',
		phone: '42566554',
		id: 'u34j315bh84'
	}
]

const getEmp = (req, res, next) => {
	res.json({ employees });
	next();
};

const patchEmp = (req, res, next) => {
	let emp = employees.find(e => e.id === req.params.id)
	let index = employees.findIndex(e => e.id === req.params.id)
	if(emp){
		let editedEmp = {...emp, ...data}
		employees.splice(index, 1)
		employees.push(editedEmp)
		res.status(200).send(`Empleado editado`)
	}else{
		res.status(404).send('No encontramos al empleado');
	}
	next()
}

// const filterEmp = (req, res, next) => {
// 	let emp = employees.filter(e => Object.keys(e).find(prop => e[prop].includes(req.params.query)))
// 	if (emp.length !== 0) {
// 		res.json({emp})
// 	next()
// }

const postEmp = (req, res, next) => {
	let data = req.body;
	data.id = `u34j3${employees.length + 1}5bh84`;
	employees.push(data);
	res.status('201').json(`Empleado recibido con el id ${data.id}`);
	next();
};

const deleteEmp = (req, res, next) => {
	let emp = employees.find(e => e.id === req.params.id)
	let index = employees.findIndex(e => e.id === req.params.id)
	if(emp){
		employees.splice(index, 1);
		res.status('200').json(`Se elimino al empleado`);
	}else{
		res.status('400').send(`No se pudo eliminar el empleado`)
	}
	next()
}

const getEmpById = (req, res, next) => {
	let resEmp = employees.find((e) => e.id === req.params.id);
	if (resEmp) {
		res.json(resEmp);
	} else {
		res.status(404).send('No encontramos al empleado');
	}
};

module.exports = { getEmp, getEmpById, patchEmp, postEmp, deleteEmp }
