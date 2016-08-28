CREATE TABLE statements.e_statement (
  id SERIAL,
  e_stakeholder_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_statement_type_id INTEGER NOT NULL,
  d_statement_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted CHAR (1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      FOREIGN KEY (e_stakeholder_id) REFERENCES stakeholders.e_stakeholder (id),
      FOREIGN KEY (d_statement_type_id) REFERENCES statements.d_statement_type (id),
      FOREIGN KEY (d_statement_state_id) REFERENCES statements.d_statement_state (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE statements.e_statement_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_stakeholder_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_statement_type_id INTEGER NOT NULL,
  d_statement_state_id INTEGER NOT NULL,
    is_deleted CHAR (1) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (e_stakeholder_id) REFERENCES stakeholders.e_stakeholder (id),
      FOREIGN KEY (d_statement_type_id) REFERENCES statements.d_statement_type (id),
      FOREIGN KEY (d_statement_state_id) REFERENCES statements.d_statement_state (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
 );
