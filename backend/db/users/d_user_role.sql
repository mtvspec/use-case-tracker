--============================================================================--
-- User role (d_user_role)
--============================================================================--
CREATE TABLE users.d_user_role (
  id SERIAL NOT NULL,
  a_user_role_name_en VARCHAR (1000) NOT NULL,
  a_user_role_desc_en TEXT,
  a_user_role_name_ru VARCHAR (1000) NOT NULL,
  a_user_role_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_user_role_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_user_role_name_ru
      )
);
--============================================================================--
INSERT INTO
  users.d_user_role (
    a_user_role_name_en,
    a_user_role_name_ru
  )
VALUES
(
  'Top manager',
  'Топ менеджер'
),
(
  'Project manager',
  'Менеджер проекта'
),
(
  'Customer',
  'Заказчик'
),
(
  'Stakeholder',
  'Заинтересованное лицо'
),
(
  'Domain subject matter',
  'Эксперт предметной области'
),
(
  'User',
  'Пользователь'
),
(
  'Designer',
  'Проектировщик'
),
(
  'Developer',
  'Разработчик'
),
(
  'Tester',
  'Тестировщик'
),
(
  'System administrator',
  'Системный администратор'
),
(
  'Administrator',
  'Администратор'
);
--============================================================================--
