--============================================================================--
-- User state (d_user_state)
--============================================================================--
CREATE TABLE users.d_user_state (
  id SERIAL NOT NULL,
  a_user_state_name_en VARCHAR (1000) NOT NULL,
  a_user_state_desc_en TEXT,
  a_user_state_name_ru VARCHAR (1000) NOT NULL,
  a_user_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_user_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_user_state_name_ru
      )
);
--============================================================================--
INSERT INTO
  users.d_user_state (
    a_user_state_name_en,
    a_user_state_name_ru
  )
VALUES
(
  'Active', -- 1
  'Действующий'
),
(
  'Blocked', -- 2
  'Заблокирован'
),
(
  'Deleted', -- 3
  'Удален'
);
--============================================================================--
