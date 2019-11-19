const initialize = async () => {
	// amo
	empData = await getEmp()
	printEmp(empData.employees)
}

const getEmp = () => {
	return fetch('/api/employees').then((res) => res.json())
}

const printEmp = (data) => {
	const container = document.getElementById('emp-table')
	container.innerHTML = ''
	data.forEach((e) => {
		container.innerHTML += createUl(e)
	})
}

const createUl = ({ name, lastName, address, email, phone, id }) => `
    <ul class="employee">
        <li>${name}&nbsp;${lastName}</li>
        <li>${address}</li>
        <li>${email}</li>
        <li>${phone}</li>
        <li>
            <a href="" id="${id}" onclick="openEditModal(id)"data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="material-icons actions">create</i></a>
            <a href="" onclick="deleteEmp(id)" id="${id}"><i class="material-icons actions">delete</i></a>
        </li>
    </ul>
`
const cleanForm = () => {
	// se podría iterar esto
	document.getElementById('name').innerHTML = ''
	document.getElementById('last-name').innerHTML = ''
	document.getElementById('address').innerHTML = ''
	document.getElementById('phone').innerHTML = ''
	document.getElementById('email').innerHTML = ''
}

const createEmp = () => {
	event.preventDefault()
	let name = document.getElementById('name')
	let lastName = document.getElementById('last-name')
	let address = document.getElementById('address')
	let phone = document.getElementById('phone')
	let email = document.getElementById('email')
	const payload = {
		name: name.value,
		lastName: lastName.value,
		address: address.value,
		phone: phone.value,
		email: email.value
	}

	if (validateForm(payload)) {
		fetch('api/employees', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then((res) => res.json())
			.then((res) => {
				payload.name.value = ''
				payload.lastName.value = ''
				payload.address.value = ''
				payload.phone.value = ''
				payload.email.value = ''
				initialize()
				cleanForm()
			})
			.catch((err) => console.log(err))
	} else {
		alert('Por favor revisá los datos ingresados.')
	}
}

const deleteEmp = (id) => {
	event.preventDefault()
	if (confirm('¿Estás segura de querer eliminar un empleado?')) {
		fetch(`/api/employees/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res)
				initialize()
			})
	}
}

const fillModal = (data) => {
	let name = document.getElementById('name')
	let lastName = document.getElementById('last-name')
	let address = document.getElementById('address')
	let phone = document.getElementById('phone')
	let email = document.getElementById('email')
	name.value = data.name
	lastName.value = data.lastName
	address.value = data.address
	phone.value = data.phone
	email.value = data.email
}

const openEditModal = (index) => {
	let emp = empData.employees.find((e) => {
		return e.id === index
	})
	fillModal(emp)
	let editBtn = document.getElementById('edit-emp')
	editBtn.onclick = () => patchEmp(index, emp)
}

const patchEmp = (index, emp) => {
	event.preventDefault()
	if (validateForm(emp)) {
		fetch(`api/employees/${index}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(emp)
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res)
				initialize()
			})
			.catch((err) => console.log(err))
	}
}

const validateForm = ({ name, lastName, phone, address, email }) => {
	let isValid = false
	let remail = /\S+@\S+\.\S+/
	if (name !== '' && lastName !== '' && phone !== '' && address !== '' && email !== '' && remail.test(email)) {
		isValid = true
	} else {
		isValid = false
	}
	return isValid
}

const filterEmp = () => {
	let input = document.getElementById('filter')
	input.innerHTML = ''
	let value = input.value
	let newData = empData.employees.filter((e) => Object.keys(e).find((prop) => e[prop].includes(value)))
	printEmp(newData)
}

const keyPress = function(event) {
	event.code === 'Enter' ? filterEmp() : false
}

// el modal tiene las opciones de editar y crear al tiempo cuando debería hacer una cosa a la vez
// además la edición está arrojando un 404 y cuando lo abro para crear tiene los mismos campos cargados al crear
