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

// exportamos la función para poder consumirla en index.js haciéndolo como ecmascript 5, en 6 se hace con import y export
module.exports={
    traerConductores
}