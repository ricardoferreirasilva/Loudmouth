CREATE TABLE user
(
    id serial,
    user_name varchar(20) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);
INSERT INTO user (user_name,first_name,last_name,password)
VALUES
('john','John','Smith','carlgustav18'),
('mike18','Mike','Dasley','marcheist'),
('hayley','Hayley','Katyusha','papastalin');

CREATE TABLE chatroom
(
     id serial PRIMARY KEY,
     creator_id BIGINT UNSIGNED NOT NULL,
     chat_name varchar(50) NOT NULL,
     FOREIGN KEY (creator_id) REFERENCES user(id)
);
INSERT INTO chatroom (creator_id,chat_name)
VALUES
(2,'Happy chat.');

CREATE TABLE message
(
     id serial PRIMARY KEY,
     sender_id BIGINT UNSIGNED NOT NULL,
     chat_id BIGINT UNSIGNED NOT NULL,
     content varchar(100),
     send_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (sender_id) REFERENCES user(id),
     FOREIGN KEY (chat_id) REFERENCES chatroom(id)
);
INSERT INTO message (sender_id,chat_id,content)
VALUES
(2,2,'I have send the first message!');
