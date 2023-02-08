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

// Para conductores
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

// Para vehiculos
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

// Para traerConductoresSinVehiculo
const traerConductoresSinVehiculo= (edad) => {
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


// exportamos la función para poder consumirla en index.js haciéndolo como ecmascript 5, en 6 se hace con import y export
module.exports={
    traerConductores,
    traerVehiculos,
    traerConductoresSinVehiculo
}