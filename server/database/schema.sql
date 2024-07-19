create table roles (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    role VARCHAR(255)
);

create table posts (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    post VARCHAR(255)
);

create table teams (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    team VARCHAR(255)
);

create table users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

create table players (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    posts_id INT UNSIGNED,
    teams_id INT UNSIGNED,
    FOREIGN KEY (posts_id) REFERENCES posts (id),
    FOREIGN KEY (teams_id) REFERENCES teams (id)
);

INSERT INTO roles (role) VALUES ('User');

INSERT INTO roles (role) VALUES ('Admin');

CREATE TRIGGER before_users_insert
BEFORE INSERT ON users
FOR EACH ROW 
BEGIN 
IF NEW.role_id IS NULL THEN 
SET NEW.role_id = (SELECT role_id FROM roles WHERE role ='User' LIMIT 1);
END IF;
END