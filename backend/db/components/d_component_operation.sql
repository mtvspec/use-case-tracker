--============================================================================--
-- Component operation (d_component_operation)
--============================================================================--
CREATE TABLE components.d_component_operation (
  id SERIAL NOT NULL,
  a_component_operation_name_en VARCHAR (1000) NOT NULL,
  a_component_operation_desc_en TEXT,
  a_component_operation_name_ru VARCHAR (1000) NOT NULL,
  a_component_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_component_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_component_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  components.d_component_operation (
    a_component_operation_name_en,
    a_component_operation_name_ru
  )
VALUES
(
  'Create component',
  'Создать компонент'
),
(
  'Update component',
  'Изменить компонент'
),
(
  'Delete component',
  'Удалить компонент'
),
(
  'Restore deleted component',
  'Восстановить удаленный компонент'
);
--============================================================================--
