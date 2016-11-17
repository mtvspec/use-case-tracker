CREATE TABLE change_requests.e_change_request (
  id SERIAL,
  a_name VARCHAR (1000) NOT NULL,
  a_description TEXT,
    is_deleted CHAR (1) NOT NULL DEFAULT 'N',
      PRIMARY KEY (id),
      UNIQUE (a_name, a_description)
);
