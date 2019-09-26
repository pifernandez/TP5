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
  }]

const middleWare = (req, res, next) => {
    console.log('Pidiendo empleados')
    res.json({ employees })
    next()
}

module.exports = middleWare