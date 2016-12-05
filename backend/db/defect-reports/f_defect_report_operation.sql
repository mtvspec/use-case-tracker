--============================================================================--
-- Defect operation (f_defect_operation)
--============================================================================--
CREATE TABLE defects.f_defect_operation (
  id BIGSERIAL,
  d_defect_operation_type_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id BIGINT NOT NULL,
  e_defect_id BIGINT NOT NULL,
  e_component_id BIGINT NOT NULL,
  e_use_case_slice_id BIGINT NOT NULL,
  e_defect_source_id BIGINT NOT NULL,
  a_defect_name VARCHAR (1000) NOT NULL,
  a_defect_desc TEXT,
  d_defect_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_defect_operation_type_id
    ) REFERENCES defects.d_defect_operation (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_defect_id
    ) REFERENCES defects.e_defect (id),
    FOREIGN KEY (
      e_component_id
    ) REFERENCES components.e_component (id),
    FOREIGN KEY (
      e_use_case_slice_id
    ) REFERENCES use_case_slices.e_use_case_slice (id),
    FOREIGN KEY (
      e_defect_source_id
    ) REFERENCES emp.e_emp (id),
    FOREIGN KEY (
      d_defect_state_id
    ) REFERENCES defects.d_defect_state (id)
);
--============================================================================--
-- Create defect (create_defect)
--============================================================================--
