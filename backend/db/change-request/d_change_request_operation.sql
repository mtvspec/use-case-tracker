--============================================================================--
-- Change request operation (d_change_request_operation)
--============================================================================--
CREATE TABLE change_requests.d_change_request_operation (
  id SERIAL NOT NULL,
  a_change_request_operation_name_en VARCHAR (1000) NOT NULL,
  a_change_request_operation_desc_en TEXT,
  a_change_request_operation_name_ru VARCHAR (1000) NOT NULL,
  a_change_request_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_change_request_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_change_request_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  change_requests.d_change_request_operation (
    a_change_request_operation_name_en,
    a_change_request_operation_name_ru
  )
VALUES
(
  'Create change request',
  'Создать запрос на изменение'
),
(
  'Update change request',
  'Изменить запрос на изменение'
),
(
  'Delete change request',
  'Удалить запрос на изменение'
),
(
  'Restore change request',
  'Восстановить удаленный запрос на изменение'
);
--============================================================================--
