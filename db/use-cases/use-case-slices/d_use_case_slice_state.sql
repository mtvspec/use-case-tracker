--============================================================================--
-- Use-slice state (d_use_case_slice_state)
--============================================================================--
CREATE TABLE use_case_slices.d_use_case_slice_state (
  id SERIAL NOT NULL,
  a_use_case_slice_state_name_en VARCHAR (1000) NOT NULL,
  a_use_case_slice_state_desc_en TEXT,
  a_use_case_slice_state_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_slice_state_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_use_case_slice_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_use_case_slice_state_name_ru
      )
);
--============================================================================--
INSERT INTO
  use_case_slices.d_use_case_slice_state (
    a_use_case_slice_state_name_en,
    a_use_case_slice_state_desc_en,
    a_use_case_slice_state_name_ru,
    a_use_case_slice_state_desc_ru
  )
VALUES
(
  'Created',
  'When it has been created',
  'Создан',
  'Означает что слайс был создан'
),
(
  'Scoped',
  'When it has been scoped and the extent of the stories covered has been clarified',
  'Очерчен',
  'Означает понятность концепции слайса всем заинтересованным лицам и границы слайса четко заданы'
),
(
  'Prepared',
  'When the slice has been prepared by enhancing the narrative and test cases to clearly define what it means to successfully implement the slice',
  'Подготовлен',
  'Означает, что вся необходимая информация для имплементации слайса собрана и спецификация слайса и тесты разработаны и приняты'
),
(
  'Analyzed',
  'When the slice has been analyzed so its impact on the components of the system is understood and the pieces a acted are ready for coding and developer testing',
  'Проанализирован',
  'Означает, что архитектура решения и основные компоненты спроектированы и готовы к имплементации и тестированию'
),
(
  'Implemented',
  'When the software system has been enhanced to implement the slice and the slice is ready for testing',
  'Имплементирован',
  'Означает, что имплементация слайса завершена и слайс готов к верификации'
),
(
  'Verified',
  'When the slice has been verified as done and is ready for inclusion in a release',
  'Проверен',
  'Означает, что верификация имплементированного слайса успешно завершена и слайс готов к включению в релиз'
),
(
  'Accepted',
  'When the slice have been accepted by its owner (stakeholder)',
  'Принят',
  'Означает, что слайс был принят его владельцем (заинтересованным лицом) и включен в релиз'
);
--============================================================================--
/*

1. Концепция (видение):
Основные входы:
  Проблемы (зачем?)
  Решения (как?)
  Заинтересованные лица (для кого?)
Основные действующие лица:
  Заинтересованные лица
  Менеджер проекта
  Ключевые аналитики
Основные выходы:
  Решение
  Границы
  Концепция
2. Спецификация (проект):
Основные входы:
  Концепция
  Заинтересованные лица
  Информация
Основные действующие лица:
  Заинтересованные лица
  Проектировщики
  Тестировщики
Основные выходы:
  Спецификация
    Модель данных
    Макеты интерфейсов
    Алгоритмы
    Справочные данные
  Тесты
    Тестовые наборы данных
3. Архитектура (технорабочий проект):
Основные входы:
  Спецификация
  Тесты
Основные действующие лица:
  Архитектор
  Разработчики
  Проектировщики
Основные выходы:
  Архитектура
  Компоненты
  Технологии
4. Имплетементация:
Основные входы:
  Спецификация
  Архитектура
Основные действующие лица:
  Разработчики
  Технические писатели
  Тестировщики
Основные выходы:
  Код
  Документация
5. Тестирование:
Основные входы:
  Тесты
  Тестовый стенд
Основные действующие лица:
  Тестировщики
6. Приемка:
Основные входы:
  Система
  Документация
Основные действующие лица:
  Заинтересованные лица
Основные выходы:
  Акт приемки
*/
