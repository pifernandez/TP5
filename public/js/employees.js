const initialize = async () => {
    empData = await getEmp()
    printEmp(empData.employees)
};

const getEmp = () => {
	return fetch('/api/employees').then((res) => res.json());
};

const printEmp = (data) => {
    const container = document.getElementById('emp-table')
    container.innerHTML = ''
    data.forEach(e => {
        let ul = document.createElement('ul')
        container.appendChild(ul)
        Object.values(e).forEach(i => {
            let li = document.createElement('li')
            li.innerText = i
            ul.appendChild(li)
        })
        let btn = document.createElement('button')
        btn.innerText = 'delete'
        btn.id = e.id
        // btn.onclick = deleteEmp(btn.id)
        ul.appendChild(btn)
    })
}

const createPayload = () => {
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
    return payload
}

const createEmp = () => {
    event.preventDefault()
    let payload = createPayload()

    if(validateForm(payload)){
        fetch('api/employees',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                payload.name.value = ''
                payload.lastName.value = ''
                payload.address.value = ''
                payload.phone.value = ''
                payload.email.value = ''
                initialize()
            })
            .catch(err => console.log(err))    
    }else{
        console.log('llena todos los campos')
    }
}


const deleteEmp = (id) =>{
    //incompleto
    fetch(`/api/employees/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            // initialize()
        })
}            

const patchEmp = (id, payload) => {
	fetch(`api/users/${id}`, {
		method: 'PATCH',
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
		})
        .catch(err => console.log(err))
};


const validateForm = ({ name, lastName, phone, address, email }) => {
    let isValid = false
    if(name !== '' && lastName !== '' && phone !== '' && address !== '' && email !== ''){
        isValid = true
    }else{
        isValid = false
    }
    return isValid
}

/*
let value = document.getelementbyid('filterinput')
let filterinput = data.filter(resource => 
    objetc.keys(resource).find(prop=>resource[prop].includes(valueinput))
)
*/
