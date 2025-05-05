
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
    status VARCHAR(30) DEFAULT 'pending review',
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

DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    id_request_destination INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    comments VARCHAR(100) NOT NULL,
    url VARCHAR(60) NOT NULL,
    FOREIGN KEY (id_request_destination) REFERENCES requests_destinations(id)
);

-- Dummy data insertions

-- Permissions
INSERT INTO permissions (name) VALUES
('create_request'),
('view_request'),
('update_request'),
('delete_request'),
('approve_request'),
('cancel_request'),
('view_logs'),
('manage_users'),
('manage_roles'),
('manage_departments');

-- Roles
INSERT INTO roles (name) VALUES
('applicant'),
('approver'),
('travel_agent'),
('admin'),
('manager');

-- Roles_Permissions
INSERT INTO roles_permissions (id_role, id_permission) VALUES
(1,1),(1,2),(1,3),
(2,2),(2,5),(2,7),
(3,2),(3,4),(3,6),
(4,1),(4,2),(4,3),(4,4),(4,5),(4,6),(4,7),(4,8),(4,9),(4,10),
(5,2),(5,5),(5,7),(5,9);

-- Departments
INSERT INTO departments (name) VALUES
('HR'),
('Engineering'),
('Finance'),
('Sales'),
('Marketing'),
('Support'),
('Research'),
('Operations'),
('Legal'),
('IT');

-- Users
INSERT INTO users (id_department, id_role, name, last_name, password, email, status) VALUES
(2,1,'John','Doe','hash1','john.doe@example.com','active'),
(3,1,'Jane','Smith','hash2','jane.smith@example.com','active'),
(1,2,'Alice','Johnson','hash3','alice.johnson@example.com','active'),
(4,3,'Bob','Lee','hash4','bob.lee@example.com','active'),
(5,4,'Carol','King','hash5','carol.king@example.com','active'),
(6,5,'David','Brown','hash6','david.brown@example.com','inactive'),
(2,1,'Eve','Davis','hash7','eve.davis@example.com','active'),
(3,2,'Frank','Miller','hash8','frank.miller@example.com','active'),
(4,3,'Grace','Wilson','hash9','grace.wilson@example.com','active'),
(5,4,'Hank','Moore','hash10','hank.moore@example.com','active'),
(6,5,'Ivy','Taylor','hash11','ivy.taylor@example.com','active'),
(1,1,'Jack','Anderson','hash12','jack.anderson@example.com','active'),
(2,2,'Kara','Thomas','hash13','kara.thomas@example.com','active'),
(3,3,'Leo','Jackson','hash14','leo.jackson@example.com','active'),
(4,4,'Mia','White','hash15','mia.white@example.com','active'),
(5,5,'Nina','Harris','hash16','nina.harris@example.com','inactive'),
(6,1,'Oscar','Martin','hash17','oscar.martin@example.com','active'),
(7,2,'Peggy','Thompson','hash18','peggy.thompson@example.com','active'),
(8,3,'Quinn','Garcia','hash19','quinn.garcia@example.com','active'),
(9,4,'Ray','Martinez','hash20','ray.martinez@example.com','active');

-- Travel Agencies
INSERT INTO travel_agencies (name) VALUES
('Global Travels'),
('Dream Vacations'),
('Holiday Experts'),
('Adventure Co'),
('Business Trips Inc');

-- User Logs
INSERT INTO user_logs (id_user, ip, report) VALUES
(1,'192.168.1.10','User logged in'),
(2,'192.168.1.11','Password changed'),
(3,'192.168.1.12','Viewed request list'),
(4,'192.168.1.13','Created a new request'),
(5,'192.168.1.14','Approved a request'),
(6,'192.168.1.15','Cancelled a request'),
(7,'192.168.1.16','Uploaded voucher'),
(8,'192.168.1.17','Downloaded report'),
(9,'192.168.1.18','Updated profile'),
(10,'192.168.1.19','Logged out'),
(11,'192.168.1.20','Viewed logs'),
(12,'192.168.1.21','Reset password'),
(13,'192.168.1.22','Changed email'),
(14,'192.168.1.23','Viewed dashboard'),
(15,'192.168.1.24','Requested password reset'),
(16,'192.168.1.25','Updated extra field');

-- Extra Fields
INSERT INTO extra_fields (name) VALUES
('phone'),
('address'),
('linkedin'),
('twitter');

-- Extra Fields Users
INSERT INTO extra_fields_users (id_extra_field, id_user) VALUES
(1,1),(1,2),(1,3),
(2,2),(2,4),(2,5),
(3,3),(3,6),(3,7),
(4,4),(4,8),(4,9);

-- Destinations
INSERT INTO destinations (country, city) VALUES
('USA','New York'),
('UK','London'),
('France','Paris'),
('Germany','Berlin'),
('Spain','Madrid'),
('Japan','Tokyo'),
('Australia','Sydney'),
('UAE','Dubai'),
('Italy','Rome'),
('Canada','Toronto'),
('Canada','Vancouver'),
('USA','San Francisco'),
('USA','Los Angeles'),
('Mexico','Mexico City'),
('Argentina','Buenos Aires'),
('Brazil','Sao Paulo'),
('China','Beijing'),
('China','Shanghai'),
('Russia','Moscow'),
('South Africa','Cape Town');

-- Requests
INSERT INTO requests (id_user, id_admin, id_travel_agent, id_origin_city, motive, is_multi_user, status, requirements, priority) VALUES
(1,5,4,14,'Conference attendance',FALSE,'pending review','Passport copy required','high'),
(2,5,4,1,'Site visit',TRUE,'approved','Project documents','medium'),
(3,5,4,2,'Client meeting',FALSE,'approved','Signed NDA','medium'),
(6,5,4,3,'Workshop',FALSE,'pending review','Lab access','low'),
(7,5,4,5,'Audit',FALSE,'cancelled','Board approval','high'),
(8,5,4,6,'Training session',TRUE,'approved','Training materials','medium'),
(9,5,4,7,'Maintenance check',FALSE,'approved','Safety docs','low'),
(10,5,4,8,'Network setup',FALSE,'pending review','Hardware specs','medium'),
(11,5,4,9,'Site inspection',TRUE,'approved','Inspection report','high'),
(12,5,4,10,'Project kickoff',FALSE,'pending review','Kickoff agenda','high');

-- User Trips
INSERT INTO user_trips (id_user, id_request) VALUES
(1,1),
(2,2),(6,2),
(3,3),
(6,4),
(7,5),
(8,6),(11,6),
(9,7),
(10,8),
(11,9),(14,9),
(12,10);

-- Requests Logs
INSERT INTO requests_logs (id_request, id_user, report, created_at) VALUES
(1,1,'Request created','2025-04-20 10:00:00+00'),
(2,2,'Request created','2025-04-21 11:00:00+00'),
(3,3,'Request created','2025-04-22 09:30:00+00'),
(4,6,'Request created','2025-04-23 14:15:00+00'),
(5,7,'Request created','2025-04-24 16:45:00+00'),
(6,8,'Request created','2025-04-25 08:20:00+00'),
(7,9,'Request created','2025-04-26 13:00:00+00'),
(8,10,'Request created','2025-04-27 09:10:00+00'),
(9,11,'Request created','2025-04-28 10:30:00+00'),
(10,12,'Request created','2025-04-29 12:00:00+00');

-- Requests Destinations
INSERT INTO requests_destinations (id_request, id_destination, destination_order, stay_days, arrival_date, departure_date, is_hotel_required, is_plane_required, is_last_destination) VALUES
(1,1,1,3,'2025-05-10 09:00:00+00','2025-05-13 18:00:00+00',TRUE,TRUE,FALSE),
(1,2,2,4,'2025-05-14 09:00:00+00','2025-05-18 18:00:00+00',TRUE,TRUE,TRUE),
(2,3,1,2,'2025-06-01 08:00:00+00','2025-06-03 20:00:00+00',FALSE,TRUE,TRUE),
(3,4,1,5,'2025-07-10 10:00:00+00','2025-07-15 22:00:00+00',TRUE,TRUE,FALSE),
(3,5,2,3,'2025-07-16 09:00:00+00','2025-07-19 17:00:00+00',TRUE,FALSE,TRUE),
(4,6,1,4,'2025-08-05 12:00:00+00','2025-08-09 23:00:00+00',TRUE,TRUE,TRUE),
(5,7,1,6,'2025-09-20 07:00:00+00','2025-09-26 21:00:00+00',TRUE,TRUE,TRUE),
(6,8,1,3,'2025-10-11 09:00:00+00','2025-10-14 19:00:00+00',FALSE,TRUE,FALSE),
(6,9,2,2,'2025-10-15 08:00:00+00','2025-10-17 20:00:00+00',TRUE,FALSE,TRUE),
(7,10,1,5,'2025-11-01 06:00:00+00','2025-11-06 18:00:00+00',TRUE,TRUE,TRUE);

-- Vouchers
INSERT INTO vouchers (id_request, class, amount, date, file_url) VALUES

(1, 'Económica', 500.00, '2025-04-10 09:00:00+00', 'http://ejemplo.com/voucher1.pdf'),
(2, 'Negocios', 1200.00, '2025-04-11 10:00:00+00', 'http://ejemplo.com/voucher2.pdf');

-- Insertar datos en la tabla reservations
INSERT INTO reservations (id_request_destination, title, comments, url) VALUES
(1, 'Conferencia anual de tecnología', 'Reserva para el evento principal', 'https://ejemplo.com/conf-tecnologia'),
(2, 'Reserva de hotel en Barcelona', 'Habitación doble con desayuno incluido', 'https://hoteles.com/reserva-1234');

