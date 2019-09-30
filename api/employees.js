const employees = []

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
	let emp = employees.find(e => e.id === req.params.id)
	let index = employees.findIndex(e => e.id === req.params.id)
	if(emp){
		employees.splice(index, 1);
		res.status('200').json(`se elimino al empleado con el id ${index}`);
	}else{
		res.status('400').send(`No se pudo eliminar el empleado con el id ${index}`)
	}
	next()
}

const getEmpByid = (req, res, next) => {
	let resEmp = employees.find((e) => e.id === req.params.id);
	if (resEmp) {
		res.json(resEmp);
	} else {
		res.status(404).send('No encontramos al empleado');
	}
};

module.exports = { getEmp, getEmpByid, patchEmp, postEmp, deleteEmp };
