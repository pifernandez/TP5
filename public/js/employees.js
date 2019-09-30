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
        container.innerHTML += createBtn(e.id)
    })
}

const createBtn = (id) => `
    <li>
        <a href="" onclick="patchEmp(id)" id="${id}" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="material-icons">create</i></a>
        <a href="" onclick="deleteEmp(id)" id="${id}"><i class="material-icons">delete</i></a>
    </li>
`

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
        alert('Por favor revisá los datos ingresados.')
    }
}


const deleteEmp = (id) =>{
    event.preventDefault()
    console.log(id)
    if(confirm('¿Estás segura de querer eliminar un empleado?')){
        fetch(`/api/employees/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
          })
              .then(res=>res.json())
              .then(res=>{
                  console.log(res)
                  initialize()
              })
    }
}            

const patchEmp = async (id) => {
    console.log(id)
    let btn = document.getElementById(id)
    let empData = await getEmp()
    console.log(empData.employees.find(e => {
        e.id == id
    }))
    /*
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
            
            payload.name.value = ''
            payload.lastName.value = ''
            payload.address.value = ''
            payload.phone.value = ''
            payload.email.value = ''
            //initialize()
		})
        .catch(err => console.log(err))*/
};


const validateForm = ({ name, lastName, phone, address, email }) => {
    let isValid = false
    //let remail = /\S+@\S+\.\S+/
    //let rphone = re = /^\+?([0-9]{3})\)?[ ]?([0-9]{3})[ ]?([0-9]{3})[ ]?([0-9]{3})$/
    if(name !== '' && lastName !== '' && phone !== '' && address !== '' && email !== ''){
        isValid = true
    }else{
        isValid = false
    }
    return isValid
}

/*
remail.test(email)
rphone.test(phone)
let value = document.getelementbyid('filterinput')
let filterinput = data.filter(resource => 
    objetc.keys(resource).find(prop=>resource[prop].includes(valueinput))
)

*/

