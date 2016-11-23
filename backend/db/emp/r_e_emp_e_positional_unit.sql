--============================================================================--
-- Emp - Positional unit (r_e_emp_e_positional_unit)
--============================================================================--
CREATE TABLE emp.r_e_emp_e_positional_unit (
  id BIGSERIAL,
  e_emp_id BIGINT NOT NULL,
  e_positional_unit_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_emp_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        e_positional_unit_id
      ) REFERENCES organizations.e_positional_unit (id)
);
--============================================================================--
