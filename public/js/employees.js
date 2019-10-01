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
        ul.innerHTML += createBtn(e.id)
    })
}

const createBtn = (id) => `
    <li>
        <a href="" id="${id}" onclick="patchEmp(id)"data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i class="material-icons actions">create</i></a>
        <a href="" onclick="deleteEmp(id)" id="${id}"><i class="material-icons actions">delete</i></a>
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

const patchEmp = (index) => {
    let emp = empData.employees.find(e => {
        return e.id === index
    })
    fillModal(emp)
    if(validateForm(emp)){
        fetch(`api/employees/${index}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emp)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                initialize()
            })
            .catch(err => console.log(err))
    }
};


const validateForm = ({ name, lastName, phone, address, email }) => {
    let isValid = false
    let remail = /\S+@\S+\.\S+/
    if(name !== '' && lastName !== '' && phone !== '' && address !== '' && email !== ''&& remail.test(email)){
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

