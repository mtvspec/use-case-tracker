CREATE TABLE system.is_deleted (
  id CHAR(1),
  condition VARCHAR (1000) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE (condition)
);

INSERT INTO
  system.is_deleted
VALUES
(
  'F',
  'FALSE'
),
(
  'T',
  'TRUE'
);
