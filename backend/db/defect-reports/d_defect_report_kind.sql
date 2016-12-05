--============================================================================--
-- Defect kind (d_defect_kind)
--============================================================================--
CREATE TABLE defects.d_defect_kind (
  id SERIAL NOT NULL,
  a_defect_kind_name_en VARCHAR (1000) NOT NULL,
  a_defect_kind_desc_en TEXT,
  a_defect_kind_name_ru VARCHAR (1000) NOT NULL,
  a_defect_kind_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_defect_kind_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_defect_kind_name_ru
      )
);
--============================================================================--
INSERT INTO defects.d_defect_kind (
  a_defect_kind_name_en,
  a_defect_kind_name_ru
)
VALUES
(
  'Bug',
  'Замечание'
);
--============================================================================--
