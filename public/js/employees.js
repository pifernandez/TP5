const initialize = async () => {
    empData = await getEmp()
    printEmp(empData.employees)
};

const getEmp = () => {
	return fetch('/api/employees').then((res) => res.json());
};

const printEmp = (data) => {
    const container = document.getElementById('emp-table')
    //container.innerHTML = ''
    data.forEach(e => {
        let ul = document.createElement('ul')
        container.appendChild(ul)
        Object.values(e).forEach(e => {
            let li = document.createElement('li')
            li.innerText = e
            ul.appendChild(li)
        })
    })
}

const createEmp = () => {
    event.preventDefault()
    const formName = document.getElementById('name')
    const formLastName = document.getElementById('last-name')
    const formAddress = document.getElementById('address')
    const formPhone = document.getElementById('phone')
    const formEmail = document.getElementById('email')

    const payload = {
        name: formName.value,
        lastName: formLastName.value,
        address: formAddress.value,
        phone: formPhone.value,
        email: formEmail.value
    }

    if(validateForm(payload)){
        fetch('api/employees',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                formName.value = ''
                formLastName.value = ''
                formAddress.value = ''
                formPhone.value = ''
                formEmail.value = ''
                initialize()
            })
            .catch(err => console.log(err))
    }
}

const patchExample = (id, payload) => {
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
            formName.value = ''
            formLastName.value = ''
            formAddress.value = ''
            formPhone.value = ''
            formEmail.value = ''
            initialize()
		})
        .catch(err => console.log(err))
};

const validateForm = (payload) => {
   let isValid = false
   console.log(payload)
    if(payload.name !== '' && payload.name.length > 2 && payload.name.length < 10){
        isValid = true
    }else{
        isValid = false
    }

    if(payload.lastName !== '' && payload.lastName.length > 2){
        isValid = true
    }else{
        isValid = false
    }
    
    if(payload.phone !== '' && payload.phone < 13){
        isValid = true
    }else{
        isValid = false
    }

    if(payload.address !== ''){
        isValid = true
    }else{
        isValid = false
    }

    if(payload.email !== ''){
        isValid = true
    }else{
        isValid = false
    }
    isValid ? console.log(isValid) : console.log(isValid)
}


/*
let value = document.getelementbyid('filterinput')
let filterinput = data.filter(resource => 
    objetc.keys(resource).find(prop=>resource[prop].includes(valueinput))
)
*/
