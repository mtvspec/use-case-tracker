--============================================================================--
-- System operation (d_system_operation)
--============================================================================--
CREATE TABLE systems.d_system_operation (
  id SERIAL NOT NULL,
  a_system_operation_name_en VARCHAR (1000) NOT NULL,
  a_system_operation_desc_en TEXT,
  a_system_operation_name_ru VARCHAR (1000),
  a_system_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
     PRIMARY KEY (
       a_system_operation_name_en
     ),
     UNIQUE (
       id
     ),
     UNIQUE (
       a_system_operation_name_ru
     )
);
--============================================================================--
INSERT INTO
  systems.d_system_operation (
    a_system_operation_name_en
  )
VALUES
(
  'Create system'
),
(
  'Update system'
),
(
  'Delete system'
),
(
  'Restore system'
);
--============================================================================--
