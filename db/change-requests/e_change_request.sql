--============================================================================--
-- Change request (e_change_request)
--============================================================================--
CREATE TABLE change_requests.e_change_request (
  id BIGSERIAL NOT NULL,
  e_change_request_source_id INTEGER NOT NULL,
  e_change_request_subject_id INTEGER NOT NULL,
  d_change_request_type_id INTEGER NOT NULL,
  a_change_request_name VARCHAR (1000) NOT NULL,
  a_change_request_desc TEXT,
  d_change_request_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_change_request_source_id,
        a_change_request_name
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        e_change_request_source_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        e_change_request_subject_id
      ) REFERENCES use_case_slices.e_use_case_slice (id),
      FOREIGN KEY (
        d_change_request_type_id
      ) REFERENCES change_requests.d_change_request_type (id),
      FOREIGN KEY (
        d_change_request_state_id
      ) REFERENCES change_requests.d_change_request_state (id)
);
--============================================================================--
