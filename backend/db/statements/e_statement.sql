--============================================================================--
-- Statement (e_statement)
--============================================================================--
CREATE TABLE statements.e_statement (
  id BIGSERIAL,
  e_stakeholder_id BIGINT NOT NULL,
  d_statement_type_id INTEGER NOT NULL,
  a_statement_name VARCHAR (1000) NOT NULL,
  a_statement_desc TEXT,
  d_statement_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_stakeholder_id
      ) REFERENCES stakeholders.e_stakeholder (id),
      FOREIGN KEY (
        d_statement_type_id
      ) REFERENCES statements.d_statement_type (id),
      FOREIGN KEY (
        d_statement_state_id
      ) REFERENCES statements.d_statement_state (id)
);
--============================================================================--
