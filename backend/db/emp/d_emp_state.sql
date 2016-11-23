--============================================================================--
-- Emp states (d_emp_state)
--============================================================================--
CREATE TABLE emp.d_emp_state (
  id SERIAL,
  a_emp_state_name_en VARCHAR (1000) NOT NULL,
  a_emp_state_desc_en TEXT,
  a_emp_state_name_ru VARCHAR (1000),
  a_emp_state_desc_ru TEXT,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      a_emp_state_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_emp_state_name_ru
    )
);
--------------------------------------------------------------------------------
INSERT INTO emp.d_emp_state (
  a_emp_state_name_en
)
VALUES
(
  'Created'
);
--============================================================================--
