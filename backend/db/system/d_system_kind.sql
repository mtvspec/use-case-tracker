--============================================================================--
-- System Kind (d_system_kind)
--============================================================================--
CREATE TABLE systems.d_system_kind (
  id SERIAL NOT NULL,
  system_kind_name_en VARCHAR (1000) NOT NULL,
  system_kind_desc_en VARCHAR (4000),
  system_kind_name_ru VARCHAR (1000) NOT NULL,
  system_kind_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        system_kind_name_en,
        system_kind_name_ru
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
