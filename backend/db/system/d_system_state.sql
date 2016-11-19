--============================================================================--
-- System State (d_system_state)
--============================================================================--
CREATE TABLE system.d_system_state (
  id SERIAL NOT NULL,
  system_state_name_en VARCHAR (1000) NOT NULL,
  system_state_desc_en VARCHAR (4000),
  system_state_name_ru VARCHAR (1000) NOT NULL,
  system_state_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        system_state_name_en,
        system_state_name_ru
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
