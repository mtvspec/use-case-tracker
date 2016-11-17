CREATE TABLE use_case_slices.d_use_case_slice_state (
  id SERIAL,
  state_en VARCHAR (1000) NOT NULL,
  description_en VARCHAR (4000),
  state_ru VARCHAR (1000),
  description_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        state_en
      ),
      UNIQUE (
        state_ru
      ),
      UNIQUE (
        description_en
      ),
      UNIQUE (
        description_ru
      ),
      UNIQUE (
        state_en,
        description_en,
        state_ru,
        description_ru
      )
);

INSERT INTO
  use_case_slices.d_use_case_slice_state (
    state_en,
    description_en,
    state_ru,
    description_ru
  )
VALUES
(
  'Scoped',
  'When it has been scoped and the extent of the stories covered has been clarified',
  'Очерчен',
  'Данный статус означает, что границы слайса очерчены (концепция слайса ясна) и можно приступать к проектированию слайса'
),
(
  'Prepared',
  'When the slice has been prepared by enhancing the narrative and test cases to clearly de ne what it means to successfully implement the slice',
  'Подготовлен',
  'Данный статус означает, что была собрана вся необходимая информация для имплементации слайса и проект слайса готов к проведению анализа (анализ слайса)'
),
(
  'Analyzed',
  'When the slice has been analyzed so its impact on the components of the system is understood and the pieces a acted are ready for coding and developer testing',
  'Проанализирован',
  'Данный статус означает, что слайс был проанализирован на предмет понимания его влияния на компоненты системы и готовы к имплементации и имплементационному тестированию'
),
(
  'Implemented',
  'When the software system has been enhanced to implement the slice and the slice is ready for testing',
  'Имплементирован',
  'Данный статус означает, что имплементация (разработка) данного слайса завершена, и можно приступать к его верификации (проверке и тестированию)'
),
(
  'Verified',
  'When the slice has been verified as done and is ready for inclusion in a release',
  'Проверен',
  'Данный статус означает, что верификация имплементированного слайса закончена и слайс готов к включению в релиз'
),
(
  'Accepted',
  '',
  'Принят',
  ''
);
