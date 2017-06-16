--============================================================================--
-- Operation (e_operation) - current
--============================================================================--
CREATE TABLE operations.e_operation (
  id BIGSERIAL,
  d_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_operation_type_id
    ) REFERENCES dict.e_dict_value (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id)
);
--============================================================================--