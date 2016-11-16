CREATE TABLE defects.e_subject (
  id SERIAL,
  a_short_name VARCHAR (1000) NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        a_name,
        a_description
      )
);
