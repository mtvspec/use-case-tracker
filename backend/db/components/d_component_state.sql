--============================================================================--
-- Component state (d_component_state)
--============================================================================--
CREATE TABLE components.d_component_state (
  id SERIAL NOT NULL,
  a_component_state_name_en VARCHAR (1000) NOT NULL,
  a_component_state_desc_en TEXT,
  a_component_state_name_ru VARCHAR (1000) NOT NULL,
  a_component_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_component_state_name_en,
        a_component_state_name_ru
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_component_state_name_ru
      )
);
--============================================================================--
INSERT INTO components.d_component_state (
  a_component_state_name_en,
  a_component_state_name_ru
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
