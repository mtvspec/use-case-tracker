--============================================================================--
-- Actor types (d_actor_type)
--============================================================================--
CREATE TABLE use_cases.d_actor_type (
  id SERIAL NOT NULL,
  actor_type_name_en VARCHAR (1000) NOT NULL,
  actor_type_desc_en TEXT,
  actor_type_name_ru VARCHAR (1000) NOT NULL,
  actor_type_desc_ru TEXT,
    PRIMARY KEY (
      actor_type_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      actor_type_name_ru
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_actor_type (
    actor_type_name_en,
    actor_type_name_ru
  )
VALUES
(
  'Human',
  'Человек'
),
(
  'System',
  'Система'
);
--============================================================================--
