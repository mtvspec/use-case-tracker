--============================================================================--
-- Emp (e_emp)
--============================================================================--
CREATE TABLE emp.e_emp (
  id BIGSERIAL,
  e_person_id BIGINT NOT NULL,
  d_emp_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_emp_position_id
    ) REFERENCES organizations.e_position (id),
    FOREIGN KEY (
      e_person_id
    ) REFERENCES persons.e_person (id),
    FOREIGN KEY (
      d_emp_status_id
    ) REFERENCES emp.d_emp_state (id)
);
--============================================================================--
