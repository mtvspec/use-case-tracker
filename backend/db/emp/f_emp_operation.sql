--============================================================================--
-- Emp operation (f_emp_operation)
--============================================================================--
CREATE TABLE emp.f_emp_operation (
  id BIGSERIAL,
  d_emp_operation_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id BIGINT NOT NULL,
  e_emp_id BIGINT NOT NULL,
  e_person_id BIGINT NOT NULL,
  d_emp_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_emp_operation_id
    ) REFERENCES emp.d_emp_operation (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_emp_id
    ) REFERENCES emp.e_emp (id),
    FOREIGN KEY (
      e_person_id
    ) REFERENCES persons.e_person (id),
    FOREIGN KEY (
      d_emp_state_id
    ) REFERENCES emp.d_emp_state (id)
);
--============================================================================--
-- Create emp (create_emp)
--============================================================================--

--============================================================================--
