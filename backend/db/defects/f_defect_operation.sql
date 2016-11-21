--============================================================================--
-- Defect operation (f_defect_operation)
--============================================================================--
CREATE TABLE defects.f_defect_operation (
  f_defect_operation_id SERIAL,
  d_defect_operation_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id INTEGER NOT NULL,
  e_defect_id INTEGER NOT NULL,
  e_component_id INTEGER NOT NULL,
  e_use_case_slice_id INTEGER NOT NULL,
  e_defect_source_id INTEGER NOT NULL,
  a_defect_name VARCHAR (1000) NOT NULL,
  a_defect_desc VARCHAR (4000),
  d_defect_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      f_defect_operation_id
    ),
    FOREIGN KEY (
      d_defect_operation_id
    ) REFERENCES defects.d_defect_operation (d_defect_operation_id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (e_user_id),
    FOREIGN KEY (
      e_defect_id
    ) REFERENCES defects.e_defect (e_defect_id),
    FOREIGN KEY (
      e_component_id
    ) REFERENCES components.e_component (e_component_id),
    FOREIGN KEY (
      e_source_id
    ) REFERENCES emp.e_emp (e_emp_id),
    FOREIGN KEY (
      d_defect_state_id
    ) REFERENCES defects.d_defect_state (d_defect_state_id)
);
--============================================================================--
-- Create defect (create_defect)
--============================================================================--
