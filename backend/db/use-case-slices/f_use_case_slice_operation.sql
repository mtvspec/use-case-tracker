--============================================================================--
-- Use-case slice (f_use_case_slice_operation)
--============================================================================--
CREATE TABLE use_case_slices.f_use_case_slice_operation (
  id BIGINT,
  d_use_case_slice_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_use_case_slice_id BIGINT NOT NULL,
  e_use_case_id BIGINT NOT NULL,
  a_use_case_slice_name VARCHAR (1000) NOT NULL,
  a_use_case_slice_desc TEXT,
  a_story_points INTEGER,
  d_use_case_slice_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_use_case_slice_operation_type_id
    ) REFERENCES use_case_slices.d_use_case_slice_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_use_case_slice_id
    ) REFERENCES use_case_slices.e_use_case_slice (id),
    FOREIGN KEY (
      e_use_case_id
    ) REFERENCES use_cases.e_use_case (id),
    FOREIGN KEY (
      d_use_case_slice_status_id
    ) REFERENCES use_case_slices.d_use_case_slice_state (id)
);
--============================================================================--
-- Create use-case slice (create_use_case_slice)
--============================================================================--
