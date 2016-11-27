--============================================================================--
-- Task operation (d_task_operation)
--============================================================================--
CREATE TABLE tasks.d_task_operation (
  id SERIAL NOT NULL,
  a_task_operation_name_en VARCHAR (1000) NOT NULL,
  a_task_operation_desc_en TEXT,
  a_task_operation_name_ru VARCHAR (1000) NOT NULL,
  a_task_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_task_operation_name_en,
        a_task_operation_name_ru
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_task_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  tasks.d_task_operation (
    a_task_operation_name_en,
    a_task_operation_name_ru
  )
VALUES
(
  'Create task',
  'Создать задачу'
),
(
  'Update task',
  'Изменить задачу'
),
(
  'Delete task',
  'Удалить задачу'
),
(
  'Restore task',
  'Восстановить задачу'
);
--============================================================================--
-- TODO: Start task
-- TODO: Suspend task
-- TODO: Renew task
-- TODO: Complete task
-- TODO: Reject task
-- TODO: Archieve task
-- TODO: Unarchieve task
-- TODO: Control task
