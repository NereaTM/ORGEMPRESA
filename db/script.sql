-- Crear base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS orgempresa;

-- Usar la base de datos
USE orgempresa;

-- Tabla de departamentos
CREATE TABLE DEPARTAMENTOS (
  id_departamento INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(255)
);

-- Tabla de empleados
CREATE TABLE EMPLEADOS (
  id_empleado INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  dni VARCHAR(20) UNIQUE,
  id_departamento INT,
  telefono VARCHAR(15),
  email VARCHAR(100),
  FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTOS(id_departamento)
  ON DELETE SET NULL
);

-- Tabla de usuarios
CREATE TABLE USUARIOS (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  contraseña VARCHAR(255) NOT NULL
);

-- Datos mínimos
INSERT INTO DEPARTAMENTOS (nombre, descripcion, imagen)
VALUES ('Contabilidad', 'Departamento de contabilidad', NULL);

INSERT INTO EMPLEADOS (nombre, dni, id_departamento, telefono, email)
VALUES ('Prueba', '00000000A', 1, '600000000', 'prueba@empresa.com');

-- Contraseña '123456' (hash con bcrypt)
INSERT INTO USUARIOS (usuario, contraseña)
VALUES ('admin', '$2a$10$4lLlv2gS0W2v/ECzYNKI0uhxuG9mcM/pQlyndpK/fixc0WW.yHuem');
