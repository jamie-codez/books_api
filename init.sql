-- CREATE DATABASE books_db;
-- CREATE USER dev_user WITH ENCRYPTED PASSWORD 'Password123';
-- GRANT ALL PRIVILEGES ON DATABASE books_db TO dev_user;

\c books_db

INSERT INTO users (username, first_name, last_name, email_address, password, created_at, updated_at,deleted_at)
VALUES
    ('Kevin Mitnik', 'Kevin', 'Mitnik', 'kevinmitnik@hotmail.com', '$2a$12$ofpp2PRCijct/ZNQfgXIruKdz/eaBpRtTFeTJu4MhYkHSSpWjD8GO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO roles (name,description, created_at, updated_at,deleted_at)
VALUES
    ('user', 'User Role', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('admin', 'Admin Role', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO user_roles (user_id, role_id, created_at, updated_at,deleted_at)
VALUES
    (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);


INSERT INTO books (title, description, author, isbn, published_date, created_at, updated_at)
VALUES
    ('Book Title 1', 'Book Description 1', 'Author 1', 'ISBN1', '2022-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Book Title 2', 'Book Description 2', 'Author 2', 'ISBN2', '2022-02-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Book Title 3', 'Book Description 3', 'Author 3', 'ISBN3', '2022-03-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);