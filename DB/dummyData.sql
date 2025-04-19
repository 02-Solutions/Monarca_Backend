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

-- Insertar datos en la tabla travel_agencies_users
INSERT INTO travel_agencies_users (id_user, id_travel_agency) VALUES
(1, 1),
(2, 2),
(3, 3);

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
