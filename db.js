const { Client } = require('pg')
 
const client = new Client({
  host: 'localhost',
  database: 'm6_l2_ejercicio2',
  port: 5432,
  // usuario por defecto 'postgres'
  user: 'postgres',
  // password con que uno instala postgres
  password: 'Paji890',
})


client.connect(); 

// Retorna la lista de todos los conductores.
const traerConductores = ()=>{
    //para hacerlo funcionar tuve que typear la consulta en el query de postgres 
    // Se debe trabajar como una promesa porque era asíncrono
    return new Promise((resolve, reject)=>{
        client.query('SELECT nombre FROM conductores;', (err, result)=>{
            if(err){
                reject(err)
            }
            client.end();
            resolve(result.rows)
        })    
    })
}


// llamando a la función
//traerConductores();

// Retorna la lista de todos los automóviles.
const traerVehiculos = () => {
    //para hacerlo funcionar tuve que typear la consulta en el query de postgres 
    // Se debe trabajar como una promesa porque era asíncrono
    return new Promise((resolve, reject) => {
        client.query("SELECT CONCAT(marca, ' - ',patente) vehiculo FROM automoviles;", (err, result) => {
            if(err){
                reject(err)
            }
            resolve(result.rows)
        })
    })
}


// Retorna lista de conductores menores de <numero> de años que no tienen automóvil
const traerConductoresSinVehiculoporEdad = (edad) => {
    return new Promise((resolve, reject) => {
        client.query(`select nombre, edad from conductores c
                        left join automoviles a
                        ON c.nombre = a.nombre_conductor
                        where edad <= ${edad} and marca is null`, (err, result) => {
            if(err){
                return reject(err)
            }
            resolve(result.rows)
        })
    })
}


// Retorna lista de automóviles que no tienen conductor y lista de conductores que no tienen automóvil
const traerSolitos = () => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT automoviles.marca AS solito FROM automoviles
                        LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
                        WHERE conductores.nombre IS NULL
                        UNION
                        SELECT conductores.nombre AS nombre_conductor FROM conductores
                        LEFT JOIN automoviles ON conductores.nombre = automoviles.nombre_conductor
                        WHERE automoviles.nombre_conductor IS NULL`, (err, result) => {
            if(err){
                return reject(err)
            }
            resolve(result.rows)
        })
    })
}


// Retorna el automóvil con la patente <string> y los datos de su conductor (si es que tiene)
const traerVehiculoporPatente = (patente) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT automoviles.marca AS marcas_auto, patente, nombre_conductor FROM automoviles
                        LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
                        WHERE patente = ${patente}`, (err, result) => {
            if(err){
                return reject(err)
            }
            resolve(result.rows)
        })
    })
}

// Retorna la lista de automóviles con patente empezada en la letra <letra> y los datos de su conductor (si es que tiene)
const traerVehiculoporPatenteyLetrainicial = (letra) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT automoviles.marca AS marcas_auto, patente, nombre_conductor FROM automoviles
                        LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
                        WHERE automoviles.patente = ${letra}%`, (err, result) => {
            if(err){
                return reject(err)
            }
            resolve(result.rows)
        })
    })
}


// exportamos la función para poder consumirla en index.js haciéndolo como ecmascript 5, en 6 se hace con import y export
module.exports={
    traerConductores,
    traerVehiculos,
    traerConductoresSinVehiculoporEdad,
    traerSolitos,
    traerVehiculoporPatente,
    traerVehiculoporPatenteyLetrainicial
}