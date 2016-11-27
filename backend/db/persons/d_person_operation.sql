--============================================================================--
-- Person operation (d_person_operation)
--============================================================================--
CREATE TABLE persons.d_person_operation (
  id SERIAL NOT NULL,
  a_person_operation_name_en VARCHAR (1000) NOT NULL,
  a_person_operation_desc_en TEXT,
  a_person_operation_name_ru VARCHAR (1000),
  a_person_operation_desc_ru TEXT,
    PRIMARY KEY (
      a_person_operation_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_person_operation_name_ru
    )
);
--============================================================================--
INSERT INTO
  persons.d_person_operation (
    a_person_operation_name_en
  )
VALUES
(
  'Create person'
),
(
  'Update person'
),
(
  'Delete person'
),
(
  'Restore person'
);
--============================================================================--
