CREATE DATABASE IF NOT EXISTS books_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE books_manager;

DROP TABLE IF EXISTS books,
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author_name VARCHAR(255) DEFAULT NULL,
    genre ENUM(
        'Fantasy',
        'Horror',
        'Romance',
        'Classic',
        'Science Fiction',
        'Mystery',
        'Thriller',
        'Historical Fiction',
        'Biography',
        'Self-Help',
        'Other'
    ) DEFAULT NULL,
    status ENUM('onPlan', 'inProgress', 'read') NOT NULL DEFAULT 'onPlan',
    rating TINYINT UNSIGNED DEFAULT NULL,
    cover_image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_rating CHECK (rating is NULL or rating BETWEEN 1 AND 5)
);
