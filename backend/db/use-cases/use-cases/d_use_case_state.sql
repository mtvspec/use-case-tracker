--============================================================================--
-- Use case states (d_use_case_state)
--============================================================================--
CREATE TABLE use_cases.d_use_case_state (
  id SERIAL NOT NULL,
  a_use_case_state_name_en VARCHAR (1000) NOT NULL,
  a_use_case_state_desc_en TEXT,
  a_use_case_state_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_use_case_state_name_en,
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_use_case_state_name_ru
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_state (
    a_use_case_state_name_en,
    a_use_case_state_desc_en
  )
VALUES
(
  'Created',
  'When the use case is created',
  'Создан',
  'Означает что вариант использования создан'
),
(
  'Goal Established',
  'When the goal of the use case has been established',
  'Цель установлена',
  'Означает что цель варианта использования установлена'
),
(
  'Story Structure Understood',
  'When the structure of the use-case narrative has been understood enough for the team to start work identifying and implementing the first use-case slices',
  'Структура истории ясна',
  'Означает что структура основного сценария ясна проектной команде для начала работы по идентификации и имплементации первого слайса'
),
(
  'Simplest Story Fulfilled',
  'When the system fulfills the simplest story that allows a user to achieve the goal',
  'Основной сценарий готов',
  'Означает что в системе имплементирован основной сценарий позволяющий пользователю достичь цели'
),
(
  'Sufficient Stories Fulfilled',
  'When the system fulfills enough of the stories to provide a usable solution',
  'Альтернативные основные сценариии готовы',
  'Означает что в системе имплементированы основные альтернативные сценарии предоставляющие полезное решение'
),
(
  'All Stories Fulfilled',
  'When the system fulfills all the stories told by the use case',
  'Все сценарии готовы',
  'Означает что в системе имплементированы все сценарии варианта использования'
);
--============================================================================--
