const express = require('express')
const app = express()
// destructuring se llaman los {}
const { traerConductores } = require('./db.js')

app.get('/', function (req, res) {
  res.send('Ejercicio 2')
})


// RETORNA LISTA DE TODOS LOS CONDUCTORES
app.get('/conductores', async function (req, res) {
    let conductores = await traerConductores();
    if(!conductores){
        res.send('No existen conductores en la BD.')
    }else{
        let acumulador = '<ol>'
        conductores.forEach(conductor => {
            acumulador += `<li>${conductor.nombre}</li>`
        });
        acumulador += '</ol>' 
        res.send(acumulador);
    }
})
  


  
app.listen(3000, ()=>console.log('Servidor escuchando en http://localhost:3000'))