--============================================================================--
-- Actor operations (d_actor_operation)
--============================================================================--
CREATE TABLE use_cases.d_actor_operation (
  id SERIAL NOT NULL,
  a_actor_operation_name_en VARCHAR (1000) NOT NULL,
  a_actor_operation_desc_en TEXT,
  a_actor_operation_name_ru VARCHAR (1000) NOT NULL,
  a_actor_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_actor_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_actor_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  use_cases.d_actor_operation (
    a_actor_operation_name_en,
    a_actor_operation_name_ru
  )
VALUES
(
  'Create actor',
  'Создать актора'
),
(
  'Update actor',
  'Изменить данные актора'
),
(
  'Delete actor',
  'Удалить актора'
),
(
  'Restore actor',
  'Восстановить удаленного актора'
);
--============================================================================--
