--============================================================================--
-- Component operation type
--============================================================================--
INSERT INTO dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  38,
  'Create component',
  'Создать компонент'
),
(
  38,
  'Update component',
  'Изменить компонент'
),
(
  38,
  'Delete component',
  'Удалить компонент'
),
(
  38,
  'Restore deleted component',
  'Восстановить удаленный компонент'
);
--============================================================================--
-- Component state
--============================================================================--
INSERT INTO dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  6,
  'Component created',
  'Компонент создан'
),
(
  6,
  'Component data updated',
  'Данные компонент обновлены'
),
(
  6,
  'Component deleted',
  'Компонент удален'
),
(
  6,
  'Deleted component restored',
  'Удаленный компонент восстановлен'
);
--============================================================================--
-- Component type
--============================================================================--
INSERT INTO dict.e_dict_value (
    e_dict_id,
    a_dict_value_name_en,
    a_dict_value_name_ru
) VALUES
(
  5,
  'Information system',
  'Информационная система'
),
(
  5,
  'Subsystem',
  'Подсистема'
);
--============================================================================--

