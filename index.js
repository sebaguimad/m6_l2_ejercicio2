const express = require('express')
const app = express()
// destructuring se llaman los {}
const { traerConductores, traerVehiculos, traerConductoresSinVehiculoporEdad, traerSolitos, traerVehiculoporPatente, traerVehiculoporPatenteyLetrainicial } = require('./db.js')

app.get('/', function (req, res) {
  res.send('Ejercicio 2')
})


// Retorna la lista de todos los conductores.
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
  
// Retorna la lista de todos los automóviles.
app.get('/vehiculos', async function(req, res) {
    traerVehiculos().then(vehiculos => {
        let acumulador = "<ol>"
        vehiculos.forEach(vehiculo => {
            console.log(vehiculo)
            acumulador+= `<li>${vehiculo.vehiculo}</li>`
        });
        acumulador+="</ol>"
        res.send(acumulador);

    }).catch(error => {
        res.send('no existen vehiculos en la BD.')
    })
  })


// Retorna lista de conductores menores de <numero> de años que no tienen automóvil
app.get('/conductoressinauto', async function(req, res) {
    let edad = req.query.edad || 99;
    traerConductoresSinVehiculoporEdad(edad).then(listado => {

        if(listado.length == 0){
            return res.send(`<h1>No se encontraron usuarios sin autos con una edad inferior o igual a ${edad}</h1>`)
        }
        let acumulador = "<ol>"
        listado.forEach(conductor => {
            console.log(conductor )
            acumulador+= `<li>Nombre: ${conductor.nombre} - Edad: ${conductor.edad}</li>`
        });
        acumulador+="</ol>"
        res.send(acumulador);

    }).catch(error => {
        console.log(error)
        res.status(500).send("Error interno del servidor.");
    })
  })


// con get con ruta /solitos: Retorna lista de automóviles que no tienen conductor y lista de conductores que no tienen automóvil
app.get('/solitos', async function(req, res) {
    traerSolitos().then(solitos => {
        let acumulador = "<ol>"
        solitos.forEach(solito => {
            console.log(solito)
            acumulador+= `<li>${solito.solito}</li>`
        });
        acumulador+="</ol>"
        res.send(acumulador);

    }).catch(error => {
        console.log(error)
        res.send('no existen vehiculos en la BD.')
    })
  })


// Con ruta get /auto retorna la lista de automóviles con patente empezada en la letra <letra> y los datos de su conductor (si es que tiene)
app.get('/auto', async function(req, res) {
    let patente = req.query.patente || '';
    patente = patente.toUpperCase()
    console.log(patente)
    traerVehiculoporPatente(patente).then(listado => {
        console.log(listado)
        if(listado.length == 0){
            console.log(patente)
            return res.send(`<h1>No se encontraron usuarios con la patente: ${conductor.patente.toUpperCase()}</h1>`)
        }

        let acumulador = "<ol>"
        listado.forEach(conductor => {
            console.log(conductor)
            acumulador+= `<li>Nombre: ${conductor.nombre_conductor} - Patente: ${conductor.patente} - Marca: ${conductor.marca}</li>`
        });

        acumulador+="</ol>"
        console.log(acumulador)
        res.send(acumulador);

    }).catch(error => {
        console.log(error)
        res.status(500).send("Error interno del servidor.");
    })
  })

// Con ruta get /sauto Retorna la lista de automóviles con patente empezada en la letra <letra> y los datos de su conductor (si es que tiene)
// si uso la misma ruta /auto (que la solicitud anterior) no reconoce conductor como referencia definida, por eso, le asigné la ruta sauto.
app.get('/sauto', async function(req, res) {
    let letra = req.query.letra || '';
    letra = letra.toUpperCase();
    console.log(letra);

    try {
        let listado = await traerVehiculoporPatenteyLetrainicial(letra);
        console.log(listado);

        if(listado.length == 0){
            return res.send(`<h1>No se encontraron vehículos con la letra inicial: ${letra.toUpperCase()}</h1>`);
        }

        let acumulador = "<ol>";
        listado.forEach(vehiculo => {
            console.log(vehiculo);
            acumulador += `<li>Nombre: ${vehiculo.nombre_conductor} - Patente: ${vehiculo.patente} - Marca: ${vehiculo.marca}</li>`;
        });
        acumulador += "</ol>";
        console.log(acumulador);
        res.send(acumulador);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error interno del servidor.");
    }
});



 
app.listen(3000, ()=>console.log('Servidor escuchando en http://localhost:3000'))