--============================================================================--
-- Change request (d_change_request_type)
--============================================================================--
CREATE TABLE change_requests.d_change_request_type (
  id SERIAL NOT NULL,
  a_change_request_type_name_en VARCHAR (1000) NOT NULL,
  a_change_request_type_desc_en TEXT,
  a_change_request_type_name_ru VARCHAR (1000) NOT NULL,
  a_change_request_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_change_request_type_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_change_request_type_name_ru
      )
);
--============================================================================--
INSERT INTO
  change_requests.d_change_request_type (
    a_change_request_type_name_en,
    a_change_request_type_name_ru
  )
VALUES
(
  'Add new element',
  'Добавить новый элемент'
),
(
  'Update element',
  'Изменить элемент'
),
(
  'Remove element',
  'Убрать элемент'
);
--============================================================================--
