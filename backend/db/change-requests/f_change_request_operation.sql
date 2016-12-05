--============================================================================--
-- Change request operation (f_change_request_operation)
--============================================================================--
CREATE TABLE change_requests.f_change_request_operation (
  id BIGINT,
  d_change_request_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_change_request_id BIGINT NOT NULL,
  e_change_request_source_id BIGINT NOT NULL,
  e_change_request_subject_id BIGINT NOT NULL,
  d_change_request_type_id INTEGER NOT NULL,
  a_change_request_name VARCHAR (1000) NOT NULL,
  a_change_request_desc TEXT,
  d_change_request_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_change_request_operation_type_id
    ) REFERENCES change_requests.d_change_request_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_change_request_id
    ) REFERENCES change_requests.e_change_request (id),
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
