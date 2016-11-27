--============================================================================--
-- Defect operations (d_defect_operation)
--============================================================================--
CREATE TABLE defects.d_defect_operation (
  id SERIAL NOT NULL,
  defect_operation_name_en VARCHAR (1000) NOT NULL,
  defect_operation_desc_en VARCHAR (4000),
  defect_operation_name_ru VARCHAR (1000) NOT NULL,
  defect_operation_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        defect_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        defect_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  defects.d_defect_operation (
    defect_operation_name_en,
    defect_operation_name_ru
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
