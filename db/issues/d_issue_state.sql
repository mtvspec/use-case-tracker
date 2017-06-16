--============================================================================--
-- Statement state (d_statement_state)
--============================================================================--
CREATE TABLE statements.d_statement_state (
  id SERIAL NOT NULL,
  a_statement_state_name_en VARCHAR (1000) NOT NULL,
  a_statement_state_desc_en TEXT,
  a_statement_state_name_ru VARCHAR (1000),
  a_statement_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_statement_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_statement_state_name_ru
      )
);
--============================================================================--
