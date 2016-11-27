--============================================================================--
-- System State (d_system_state)
--============================================================================--
CREATE TABLE systems.d_system_state (
  id SERIAL NOT NULL,
  a_system_state_name_en VARCHAR (1000) NOT NULL,
  a_system_state_desc_en TEXT,
  a_system_state_name_ru VARCHAR (1000),
  a_system_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_system_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_system_state_name_ru
      )
);
--============================================================================--
INSERT INTO
  systems.d_system_state (
    a_system_state_name_en
  )
VALUES
(
  'Created'
);
--============================================================================--
