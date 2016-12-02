--============================================================================--
-- Defect operations (d_defect_operation)
--============================================================================--
CREATE TABLE defects.d_defect_operation (
  id SERIAL NOT NULL,
  a_defect_operation_name_en VARCHAR (1000) NOT NULL,
  a_defect_operation_desc_en VARCHAR (4000),
  a_defect_operation_name_ru VARCHAR (1000) NOT NULL,
  a_defect_operation_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_defect_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_defect_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  defects.d_defect_operation (
    a_defect_operation_name_en,
    a_defect_operation_name_ru
  )
VALUES
(
  'Create defect',
  'Зарегистрировать дефект'
),
(
  'Update defect',
  'Обновить данные факта регистрации дефекта'
),
(
  'Delete defect',
  'Удалить дефект'
);
--============================================================================--
