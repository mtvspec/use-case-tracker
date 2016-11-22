CREATE TABLE change_requests.e_change_request (
  id SERIAL,
  e_change_request_source_id INTEGER NOT NULL,
  a_change_request_name VARCHAR (1000) NOT NULL,
  a_change_request_desc TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_change_request_source_id,
        a_change_request_name
      ),
      UNIQUE (
        a_change_request_desc
      ),
      FOREIGN KEY (
        e_change_request_source_id
      ) REFERENCES emp.e_emp (e_emp_id)
);
