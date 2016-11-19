--============================================================================--
-- System Type (d_system_type)
--============================================================================--
CREATE TABLE systems.d_system_type (
  id SERIAL NOT NULL,
  system_type_name_en VARCHAR (1000) NOT NULL,
  system_type_desc_en VARCHAR (4000),
  system_type_name_ru VARCHAR (1000) NOT NULL,
  system_type_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        system_type_name_en,
        system_type_name_ru
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
