--============================================================================--
-- Use-case complexity (d_use_case_complexity)
--============================================================================--
INSERT INTO dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  33,
  'Undefined',
  'Неопределено'
),
(
  33,
  'Low',
  'Низкая'
),
(
  33,
  'Medium',
  'Средняя'
),
(
  33,
  'High',
  'Высокая'
);
--============================================================================--
-- Use case levels (d_use_case_level)
--============================================================================--
INSERT INTO dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  34,
  'Black box',
  'Черный ящик'
),
(
  34,
  'White box',
  'Прозрачный ящик'
);
--============================================================================--
-- Use case operation (d_use_case_operation)
--============================================================================--
INSERT INTO dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  36,
  'Create use case',
  'Создать вариант использования'
),
(
  36,
  'Update use case',
  'Обновить вариант использования'
),
(
  36,
  'Delete use case',
  'Удалить вариант использования'
),
(
  36,
  'Restore use case',
  'Восстановить вариант использования'
);
--============================================================================--
-- Use-case size (d_use_case_size)
--============================================================================--
INSERT INTO
  dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  25,
  'Small',
  'Маленький'
),
(
  25,
  'Medium',
  'Средний'
),
(
  25,
  'Large',
  'Большой'
),
(
  25,
  'Very Large',
  'Очень большой'
);
--============================================================================--
-- Use case states
--============================================================================--
INSERT INTO
  dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_desc_en,
    a_dict_value_name_ru,
    a_dict_value_desc_ru
) VALUES
(
  23,
  'Created',
  'When the use case is created',
  'Создан',
  'Означает что вариант использования создан'
),
(
  23,
  'Goal Established',
  'When the goal of the use case has been established',
  'Цель установлена',
  'Означает что цель варианта использования установлена'
),
(
  23,
  'Story Structure Understood',
  'When the structure of the use-case narrative has been understood enough for the team to start work identifying and implementing the first use-case slices',
  'Структура истории ясна',
  'Означает что структура основного сценария ясна проектной команде для начала работы по идентификации и имплементации первого слайса'
),
(
  23,
  'Simplest Story Fulfilled',
  'When the system fulfills the simplest story that allows a user to achieve the goal',
  'Основной сценарий готов',
  'Означает что в системе имплементирован основной сценарий позволяющий пользователю достичь цели'
),
(
  23,
  'Sufficient Stories Fulfilled',
  'When the system fulfills enough of the stories to provide a usable solution',
  'Альтернативные основные сценариии готовы',
  'Означает что в системе имплементированы основные альтернативные сценарии предоставляющие полезное решение'
),
(
  23,
  'All Stories Fulfilled',
  'When the system fulfills all the stories told by the use case',
  'Все сценарии готовы',
  'Означает что в системе имплементированы все сценарии варианта использования'
);
--============================================================================--
-- Use case types
--============================================================================--
INSERT INTO
  dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  24,
  'Business use-case',
  'Бизнес кейс'
),
(
  24,
  'User use-case',
  'Пользовательский кейс'
),
(
  24,
  'System use-case',
  'Системный кейс'
);
--============================================================================--
