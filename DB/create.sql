
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


DROP TABLE IF EXISTS travel_agencies_users;
CREATE TABLE travel_agencies_users (
    id SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_travel_agency INT NOT NULL,
    FOREIGN KEY (id_travel_agency) REFERENCES travel_agencies(id),
    FOREIGN KEY (id_user) REFERENCES users(id)
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
    FOREIGN KEY (id_travel_agent) REFERENCES travel_agencies_users(id),
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