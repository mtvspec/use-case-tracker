--============================================================================--
-- Change request (e_change_request)
--============================================================================--
CREATE TABLE change_requests.e_change_request (
  id BIGSERIAL NOT NULL,
  e_change_request_source_id INTEGER NOT NULL,
  e_change_request_subject_id INTEGER NOT NULL,
  a_change_request_name VARCHAR (1000) NOT NULL,
  a_change_request_desc TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_change_request_source_id,
        a_change_request_name
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_change_request_desc
      ),
      FOREIGN KEY (
        e_change_request_source_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        e_change_request_subject_id
      ) REFERENCES use_case_slices.e_use_case_slice (id)
);
--============================================================================--
