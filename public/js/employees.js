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
        let deleteBtn = document.createElement('button')
        let editBtn = document.createElement('button')
        deleteBtn.innerText = 'delete'
        deleteBtn.id = e.id
        console.log(deleteBtn)
        deleteBtn.onclick = () => deleteEmp(deleteBtn.id)
        editBtn.innerText = 'edit'
        editBtn.id = e.id
        editBtn.onclick = () => patchEmp(editBtn.id)
        ul.appendChild(editBtn)
        ul.appendChild(deleteBtn)
    })
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
        email: email.value,
    }

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
        alert('llena todos los campos')
    }
}


const deleteEmp = (idEmp) =>{
    console.log(idEmp)
    // alert('?')
    
    fetch(`/api/employees/${idEmp}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            initialize()
        })
}            

const patchEmp = (id) => {
    console.log(id)
    
	fetch(`api/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
		.then((res) => res.json())
		.then((res) => {
            console.log(res)
            /*
            payload.name.value = ''
            payload.lastName.value = ''
            payload.address.value = ''
            payload.phone.value = ''
            payload.email.value = ''*/
            initialize()
		})
        .catch(err => console.log(err))
};


const validateForm = ({ name, lastName, phone, address, email }) => {
    let isValid = false
    let remail = /\S+@\S+\.\S+/
    let rphone = re = /^\+?([0-9]{3})\)?[ ]?([0-9]{3})[ ]?([0-9]{3})[ ]?([0-9]{3})$/
    if(name !== '' && lastName !== '' && phone !== '' && rphone.test(phone) && address !== '' && email !== '' && remail.test(email)){
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

//https://github.com/mcassiraga/tp5ShirleyMar/blob/master/public/scripts/employees.js
//https://github.com/MalenaLucero/tp5DaianaMalena/blob/master/public/main.js
