--============================================================================--
-- Stakeholder operation (d_stakeholder_operation)
--============================================================================--
CREATE TABLE stakeholders.d_stakeholder_operation (
  id SERIAL NOT NULL,
  a_stakeholder_operation_name_en VARCHAR (1000) NOT NULL,
  a_stakeholder_operation_desc_en TEXT,
  a_stakeholder_operation_name_ru VARCHAR (1000),
  a_stakeholder_operation_desc_ru TEXT,
    PRIMARY KEY (
      a_stakeholder_operation_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_stakeholder_operation_name_ru
    )
);
--============================================================================--
