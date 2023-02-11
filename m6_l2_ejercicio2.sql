

CREATE TABLE conductores
(
    nombre VARCHAR(255),
    edad INT
);

insert into conductores (nombre, edad) values ('Don Pepe', 55);
insert into conductores (nombre, edad) values ('Pedro', 25);
insert into conductores (nombre, edad) values ('Maria', 33);
insert into conductores (nombre, edad) values ('Francisco', 19);
insert into conductores (nombre, edad) values ('Camilo', 29);
insert into conductores (nombre, edad) values ('Andres', 35);
insert into conductores (nombre, edad) values ('Mario', 48);
insert into conductores (nombre, edad) values ('Felipe', 33);

CREATE TABLE automoviles
(
    marca VARCHAR(255),
    patente VARCHAR(255),
    nombre_conductor VARCHAR(255)
);

insert into automoviles (marca, patente, nombre_conductor) values ('Ford', 'HXJH55', 'Felipe');
insert into automoviles (marca, patente, nombre_conductor) values ('Toyota', 'HLSA26', 'Pedro');
insert into automoviles (marca, patente, nombre_conductor) values ('Mercedes', 'JFTS47', 'Maria');
insert into automoviles (marca, patente, nombre_conductor) values ('Chevrolet', 'RTPP97', 'Francisco');
insert into automoviles (marca, patente, nombre_conductor) values ('Nissan', 'SDTR51', 'Don Pepe');
insert into automoviles (marca, patente, nombre_conductor) values ('Mazda', 'RDCS19', 'Francisco');
insert into automoviles (marca, patente, nombre_conductor) values ('Kia', 'KDTZ28', 'Don Pepe');
insert into automoviles (marca, patente, nombre_conductor) values ('Jeep', 'FFDF88', 'Paulina');
insert into automoviles (marca, patente, nombre_conductor) values ('Suzuki', 'DRTS41', 'Heriberto');
insert into automoviles (marca, patente, nombre_conductor) values ('Honda', 'BXVZ67', 'Manuel');

select * from conductores;
select * from automoviles;
SELECT nombre FROM conductores;

select concat(marca, ' - ',patente) from automoviles;

-- Retorna la lista de todos los conductores.
select nombre from conductores 

-- Retorna la lista de todos los automóviles.
SELECT automoviles.marca AS automóviles FROM automoviles

-- Retorna lista de conductores menores de <numero> de años que no tienen automóvil
select nombre, edad from conductores c
left join automoviles a
ON c.nombre = a.nombre_conductor
where edad <= ${edad} and marca is null

-- Retorna lista de automóviles que no tienen conductor 1era forma
select * from conductores c
left join automoviles a
ON c.nombre = a.nombre_conductor;

-- Retorna lista de conductores que no tienen automóvil 1era forma
select nombre, edad from conductores c
left join automoviles a
ON c.nombre = a.nombre_conductor
where marca is null

-- Retorna lista de automóviles que no tienen conductor 2da forma
SELECT automoviles.marca AS marcas_auto FROM automoviles
LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
WHERE conductores.nombre IS NULL

-- Retorna lista de conductores que no tienen automóvil 2da forma
SELECT conductores.nombre AS nombre_conductor FROM conductores
LEFT JOIN automoviles ON conductores.nombre = automoviles.nombre_conductor
WHERE automoviles.nombre_conductor IS NULL

-- Unidas las dos anteriores
SELECT automoviles.marca AS solitos FROM automoviles
LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
WHERE conductores.nombre IS NULL
union
SELECT conductores.nombre AS nombre_conductor FROM conductores
LEFT JOIN automoviles ON conductores.nombre = automoviles.nombre_conductor
WHERE automoviles.nombre_conductor IS NULL

-- Retorna el automóvil con la patente <string> y los datos de su conductor (si es que tiene)
SELECT automoviles.marca AS marcas_auto, patente, nombre_conductor FROM automoviles
LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
WHERE patente = ${patente}

SELECT marca, patente, nombre_conductor FROM automoviles
LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
WHERE patente = ${patente}

-- Retorna la lista de automóviles con patente empezada en la letra <letra> y los datos de su conductor (si es que tiene)
SELECT marca, patente, nombre_conductor FROM automoviles
LEFT JOIN conductores ON conductores.nombre = automoviles.nombre_conductor
WHERE patente ilike ${letra}%
