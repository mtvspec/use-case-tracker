--============================================================================--
-- Test case operation (f_test_operation)
--============================================================================--
CREATE TABLE test_cases.f_test_operation (
  id BIGSERIAL,
  d_test_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  a_test_case_name VARCHAR (1000) NOT NULL,
  a_test_case_desc TEXT,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_test_operation_type_id
    ) REFERENCES test_cases.d_test_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id)
)
--============================================================================--
