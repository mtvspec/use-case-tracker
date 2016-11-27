--============================================================================--
-- User operation (d_user_operation)
--============================================================================--
CREATE TABLE users.d_user_operation (
  id SERIAL NOT NULL,
  a_user_operation_name_en VARCHAR (1000) NOT NULL,
  a_user_operation_desc_en TEXT,
  a_user_operation_name_ru VARCHAR (1000) NOT NULL,
  a_user_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_user_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_user_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  users.d_user_operation (
    a_user_operation_name_en,
    a_user_operation_name_ru
  )
VALUES
(
  'Create user', -- 1
  'Создать пользователя'
),
(
  'Change user password', -- 2
  'Изменить пароль пользователя'
),
(
  'Block user', -- 3
  'Заблокировать пользователя'
),
(
  'Unblock user', -- 4
  'Разблокировать пользователя'
),
(
  'Delete user', -- 5
  'Удалить пользователя'
),
(
  'Restore deleted user', -- 6
  'Восстановить удаленного пользователя'
);
--============================================================================--
