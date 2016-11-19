--============================================================================--
-- Record Condition (d_record_condition)
--============================================================================--
CREATE TABLE systems.d_record_condition (
  id BOOLEAN,
  record_condition_name_en VARCHAR (1000) NOT NULL,
  record_condition_name_ru VARCHAR (1000) NOT NULL,
   PRIMARY KEY (
     record_condition_name_en,
     record_condition_name_ru
   ),
   UNIQUE (
     id
   )
);
--------------------------------------------------------------------------------
INSERT INTO
  system.is_deleted (
    id,
    record_condition_name_en,
    record_condition_name_ru
  )
VALUES
(
  'FALSE',
  'Ok',
  'Ок'
),
(
  'TRUE',
  'Record deleted',
  'Запись удалена'
);
--============================================================================--
