CREATE DATABASE Yokohama;
USE Yokohama;

CREATE TABLE clientes (
id_clientes INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(100) NOT NULL
);

CREATE TABLE reservas (
id_reservas INT AUTO_INCREMENT PRIMARY KEY, 
restaurantes VARCHAR(200),
data DATE NOT NULL,
hora TIME NOT NULL,
quantidade INT
);

CREATE TABLE pedidos ( 
id_pedidos INT AUTO_INCREMENT PRIMARY KEY, 
id_clientes INT,
id_reservas INT,
FOREIGN KEY (id_clientes) REFERENCES clientes(id_clientes),
FOREIGN KEY (id_reservas) REFERENCES reservas(id_reservas)
); 

ALTER TABLE reservas ADD UNIQUE INDEX unique_reserva (restaurantes, data, hora);

CREATE VIEW data_proxima AS
SELECT restaurantes, data, hora, quantidade FROM reservas
WHERE data >= '2024-12-03' AND data < '2024-12-30';

SELECT * FROM clientes;
SELECT * FROM reservas;
SELECT * FROM data_proxima;
