--============================================================================--
-- User role operation (d_user_role_operation)
--============================================================================--
CREATE TABLE users.d_user_role_operation (
  id SERIAL NOT NULL,
  a_user_role_operation_name_en VARCHAR (1000) NOT NULL,
  a_user_role_operation_desc_en TEXT,
  a_user_role_operation_name_ru VARCHAR (1000) NOT NULL,
  a_user_role_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        a_user_role_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_user_role_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  users.d_user_role_operation (
    a_user_role_operation_name_en,
    a_user_role_operation_name_ru
  )
VALUES
(
  'Add user role',
  'Добавить роль пользователя'
),
(
  'Change user role',
  'Изменить роль пользователя'
),
(
  'Remove user role',
  'Убрать роль пользователя'
);
--============================================================================--
