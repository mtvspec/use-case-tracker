--============================================================================--
-- Statement type (d_statement_type)
--============================================================================--
create table statements.d_statement_type (
  id SERIAL NOT NULL,
  a_statement_type_name_en VARCHAR (1000) NOT NULL,
  a_statement_type_desc_en TEXT,
  a_statement_type_name_ru VARCHAR (1000),
  a_statement_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_statement_type_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_statement_type_name_ru
      )
);
--============================================================================--
INSERT INTO
  statements.d_statement_type (
    a_statement_type_name_en,
    a_statement_type_name_ru
  )
VALUES
(
  'Business Problem',
  'Бизнес-проблема'
),
(
  'Business Objective',
  'Бизнес-цель'
),
(
  'Business Requirement',
  'Бизнес-требование'
),
(
  'Business Rule',
  'Бизнес правило'
),
(
  'Solution',
  'Решение'
);
--============================================================================--
