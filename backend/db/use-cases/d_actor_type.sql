--============================================================================--
-- Actor types (d_actor_type)
--============================================================================--
CREATE TABLE use_cases.d_actor_type (
  id SERIAL NOT NULL,
  actor_type_name_en VARCHAR (1000) NOT NULL,
  actor_type_description_en VARCHAR (4000),
  actor_type_name_ru VARCHAR (1000),
  actor_type_description_ru VARCHAR (4000),
    PRIMARY KEY (
      actor_type_name_en
    ),
    UNIQUE (
      id
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_actor_type (
    actor_type_name_en
  )
VALUES
(
  'Human'
),
(
  'System'
);
--------------------------------------------------------------------------------
