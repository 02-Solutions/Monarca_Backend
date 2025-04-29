
DROP TABLE IF EXISTS permissions;
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


DROP TABLE IF EXISTS roles_permissions;
CREATE TABLE roles_permissions (
    id_role INT NOT NULL,
    id_permission INT NOT NULL,
    PRIMARY KEY (id_role, id_permission),
    FOREIGN KEY (id_role) REFERENCES roles(id),
    FOREIGN KEY (id_permission) REFERENCES permissions(id)
);


DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);



DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    id_department INT,
    id_role INT,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_department) REFERENCES departments(id),
    FOREIGN KEY (id_role) REFERENCES roles(id)
);


DROP TABLE IF EXISTS travel_agencies;
CREATE TABLE travel_agencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);



DROP TABLE IF EXISTS users_logs;
CREATE TABLE user_logs (
    id SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(39) NOT NULL,
    report TEXT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id)
);



DROP TABLE IF EXISTS extra_fields;
CREATE TABLE extra_fields (
    id SERIAL PRIMARY KEY,
    name VARCHAR (50) NOT NULL
);


DROP TABLE IF EXISTS extra_fields_users;
CREATE TABLE extra_fields_users (
    id_extra_field INT NOT NULL,
    id_user INT NOT NULL,
    PRIMARY KEY (id_extra_field, id_user),
    FOREIGN KEY (id_extra_field) REFERENCES extra_fields(id),
    FOREIGN KEY (id_user) REFERENCES users(id)
);


DROP TABLE IF EXISTS destinations;
CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL
    );


DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_admin INT NOT NULL,
    id_travel_agent INT NOT NULL,
    id_origin_city INT NOT NULL,
    motive TEXT,
    is_multi_user BOOLEAN DEFAULT false,
    status VARCHAR(30) DEFAULT 'pending',
    requirements TEXT,
    priority VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_admin) REFERENCES users(id),
    FOREIGN KEY (id_travel_agent) REFERENCES users(id),
    FOREIGN KEY (id_origin_city) REFERENCES destinations(id)
);



DROP TABLE IF EXISTS user_trips;
CREATE TABLE user_trips (
    id_user INT NOT NULL,
    id_request INT NOT NULL,
    PRIMARY KEY (id_user, id_request),
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_request) REFERENCES requests(id)
);


DROP TABLE IF EXISTS requests_logs;
CREATE TABLE requests_logs (
    id SERIAL PRIMARY KEY,
    id_request INT NOT NULL,
    id_user INT NOT NULL,
    report TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY (id_request) REFERENCES requests(id),
    FOREIGN KEY (id_user) REFERENCES users(id)
);


DROP TABLE IF EXISTS requests_destinations;
CREATE TABLE requests_destinations (
    id SERIAL PRIMARY KEY,
    id_request INT NOT NULL,
    id_destination INT NOT NULL,
    destination_order INT NOT NULL,
    stay_days INT NOT NULL,
    arrival_date TIMESTAMP WITH TIME ZONE NOT NULL,
    departure_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_hotel_required BOOLEAN NOT NULL,
    is_plane_required BOOLEAN NOT NULL,
    is_last_destination BOOLEAN NOT NULL,
    FOREIGN KEY (id_request) REFERENCES requests(id),
    FOREIGN KEY (id_destination) REFERENCES destinations(id)
);

DROP TABLE IF EXISTS vouchers;
CREATE TABLE vouchers (
    id SERIAL PRIMARY KEY,
    id_request INT NOT NULL,
    class VARCHAR(50) NOT NULL,
    amount FLOAT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    file_url VARCHAR(60) NOT NULL,
    FOREIGN KEY (id_request) REFERENCES requests(id)
);


DROP TABLE IF EXISTS flights;
CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    id_request_destination INT NOT NULL,
    departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
    arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
    departure_airport VARCHAR(10) NOT NULL,
    arrival_airport VARCHAR(10) NOT NULL,
    flight_number VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_request_destination) REFERENCES requests_destinations(id)
);

DROP TABLE IF EXISTS hotel_reservations;
CREATE TABLE hotel_reservations (
    id SERIAL PRIMARY KEY,
    id_request_destination INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    check_in TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out TIMESTAMP WITH TIME ZONE NOT NULL,
    address TEXT NOT NULL,
    file_url VARCHAR(60) NOT NULL,
    FOREIGN KEY (id_request_destination) REFERENCES requests_destinations(id)
);

-- DUMMY DATA --
-- Insertar datos en la tabla departments
INSERT INTO departments (name) VALUES
('Ventas'),
('Marketing'),
('TI'),
('Recursos Humanos');

-- Insertar datos en la tabla roles
INSERT INTO roles (name) VALUES
('N1'),
('N2'),
('Empleado');

-- Insertar datos en la tabla permissions
INSERT INTO permissions (name) VALUES
('Ver Reportes'),
('Editar Datos'),
('Eliminar Datos');

-- Insertar datos en la tabla roles_permissions
INSERT INTO roles_permissions (id_role, id_permission) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(3, 1);

-- Insertar datos en la tabla users
INSERT INTO users (id_department, id_role, name, last_name, password, email, status) VALUES
(1, 1, 'Juan', 'Pérez', 'contrasena123', 'juan.perez@ejemplo.com', 'activo'),
(2, 2, 'Ana', 'García', 'contrasena123', 'ana.garcia@ejemplo.com', 'activo'),
(3, 3, 'Luis', 'Martínez', 'contrasena123', 'luis.martinez@ejemplo.com', 'inactivo');

-- Insertar datos en la tabla travel_agencies
INSERT INTO travel_agencies (name) VALUES
('ViajesGlobal'),
('AventuraSinLímite'),
('PlanificadoresDeVacaciones');

-- Insertar datos en la tabla user_logs (agregando registros de ejemplo)
INSERT INTO user_logs (id_user, ip, report) VALUES
(1, '127.0.0.1', 'User logged in'),
(2, '127.0.0.1', 'User logged in'),
(3, '127.0.0.1', 'User logged in');

-- Insertar datos en la tabla extra_fields
-- Se corrigió eliminando la coma final y se agregó un tercer campo para coincidir con la siguiente inserción
INSERT INTO extra_fields (name) VALUES
('Numero pasaporte'),
('Contacto de Emergencia'),
('Otro campo extra');

-- Insertar datos en la tabla extra_fields_users
INSERT INTO extra_fields_users (id_extra_field, id_user) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Insertar datos en la tabla destinations
INSERT INTO destinations (country, city) VALUES
('Estados Unidos', 'Nueva York'),
('Francia', 'París'),
('Japón', 'Tokio');

-- Insertar datos en la tabla requests
INSERT INTO requests (id_user, id_admin, id_travel_agent, id_origin_city, motive, is_multi_user, status, requirements, priority) VALUES
(1, 2, 1, 1, 'Reunión de Negocios', false, 'pendiente', 'Hotel y Vuelo', 'Alta'),
(2, 3, 2, 2, 'Vacaciones', true, 'aprobada', 'Solo Vuelo', 'Media');

-- Insertar datos en la tabla user_trips
INSERT INTO user_trips (id_user, id_request) VALUES
(1, 1),
(2, 2);

-- Insertar datos en la tabla requests_logs
INSERT INTO requests_logs (id_request, id_user, report, created_at) VALUES
(1, 1, 'Solicitud creada', CURRENT_TIMESTAMP),
(2, 2, 'Solicitud aprobada', CURRENT_TIMESTAMP);

-- Insertar datos en la tabla requests_destinations
INSERT INTO requests_destinations (id_request, id_destination, destination_order, stay_days, arrival_date, departure_date, is_hotel_required, is_plane_required, is_last_destination) VALUES
(1, 1, 1, 5, '2025-04-15 10:00:00+00', '2025-04-20 18:00:00+00', true, true, false),
(2, 2, 1, 7, '2025-05-01 12:00:00+00', '2025-05-08 20:00:00+00', false, true, true);

-- Insertar datos en la tabla vouchers
INSERT INTO vouchers (id_request, class, amount, date, file_url) VALUES
(1, 'Económica', 500.00, '2025-04-10 09:00:00+00', 'http://ejemplo.com/voucher1.pdf'),
(2, 'Negocios', 1200.00, '2025-04-11 10:00:00+00', 'http://ejemplo.com/voucher2.pdf');

-- Insertar datos en la tabla flights
INSERT INTO flights (id_request_destination, departure_time, arrival_time, departure_airport, arrival_airport, flight_number) VALUES
(1, '2025-04-15 10:00:00+00', '2025-04-15 14:00:00+00', 'JFK', 'CDG', 'AF123'),
(2, '2025-05-01 12:00:00+00', '2025-05-01 16:00:00+00', 'LAX', 'NRT', 'JL456');

-- Insertar datos en la tabla hotel_reservations
INSERT INTO hotel_reservations (id_request_destination, name, check_in, check_out, address, file_url) VALUES
(1, 'Hotel París', '2025-04-15 15:00:00+00', '2025-04-20 11:00:00+00', '123 Calle París, París, Francia', 'http://ejemplo.com/hotel1.pdf'),
(2, 'Posada Tokio', '2025-05-01 15:00:00+00', '2025-05-08 11:00:00+00', '456 Calle Tokio, Tokio, Japón', 'http://ejemplo.com/hotel2.pdf');
