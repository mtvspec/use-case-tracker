--============================================================================--
-- Actor state (d_actor_state)
--============================================================================--
CREATE TABLE use_cases.d_actor_state (
  id SERIAL NOT NULL,
  a_actor_state_name_en VARCHAR (1000) NOT NULL,
  a_actor_state_desc_en TEXT,
  a_actor_state_name_ru VARCHAR (1000) NOT NULL,
  a_actor_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_actor_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_actor_state_name_ru
      )
);
--============================================================================--
INSERT INTO
  use_cases.d_actor_state (
    a_actor_state_name_en,
    a_actor_state_name_ru
  )
VALUES
(
  'Created',
  'Создан'
),
(
  'Updated',
  'Обновлен'
),
(
  'Deleted',
  'Удален'
);
--============================================================================--
