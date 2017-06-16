--============================================================================--
-- Stakeholder state (d_stakeholder_state)
--============================================================================--
CREATE TABLE stakeholders.d_stakeholder_state (
  id SERIAL NOT NULL,
  a_stakeholder_state_name_en VARCHAR (1000) NOT NULL,
  a_stakeholder_state_desc_en TEXT,
  a_stakeholder_state_name_ru VARCHAR (1000),
  a_stakeholder_state_desc_ru TEXT,
    PRIMARY KEY (
      a_stakeholder_state_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_stakeholder_state_name_ru
    )
);
--============================================================================--
