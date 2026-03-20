CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    state VARCHAR(100),
    city VARCHAR(100),
    ward_no VARCHAR(50)
);

ALTER TABLE `user`
ADD COLUMN role VARCHAR(50);

ALTER TABLE user
ADD COLUMN address VARCHAR(255) AFTER city;


CREATE TABLE complaint (
    id INT AUTO_INCREMENT PRIMARY KEY,
    raisedby INT,
    FOREIGN KEY (raisedby) REFERENCES user(id),
    complaint TEXT,
    summary TEXT,
    category TEXT,
    tags TEXT,
    wardno INT,
    status TEXT
);

ALTER TABLE complaint
ADD COLUMN DATE TEXT;

ALTER TABLE complaint ADD severity VARCHAR(50);
ALTER TABLE complaint ADD priority INT;