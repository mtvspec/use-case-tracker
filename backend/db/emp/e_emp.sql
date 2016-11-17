CREATE TABLE emp.e_emp (
  id SERIAL,
  position_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  status_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      position_id
    ) REFERENCES organizations.e_position (id),
    FOREIGN KEY (
      person_id
    ) REFERENCES persons.e_person (id),
    FOREIGN KEY (
      status_id
    ) REFERENCES emp.d_emp_state (id)
);
