--============================================================================--
-- Customer operation (d_customer_operation)
--============================================================================--
CREATE TABLE customers.d_customer_operation (
  id SERIAL NOT NULL,
  a_customer_operation_name_en VARCHAR (1000) NOT NULL,
  a_customer_operation_desc_en TEXT,
  a_customer_operation_name_ru VARCHAR (1000) NOT NULL,
  a_customer_operation_desc_ru TEXT,
    PRIMARY KEY (
      a_customer_operation_name_en,
      a_customer_operation_name_ru
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_customer_operation_name_ru
    )
);
--============================================================================--
INSERT INTO
  customers.d_customer_operation (
    a_customer_operation_name_en,
    a_customer_operation_name_ru
  )
VALUES
(
  'Created',
  'Создан'
),
(
  'Updated',
  'Обновлен'
),
(
  'Deleted',
  'Удален'
),
(
  'Restored',
  'Восстановлен'
);
--============================================================================--
