--============================================================================--
-- Defect state (d_defect_state)
--============================================================================--
CREATE TABLE defects.d_defect_state (
  id SERIAL NOT NULL,
  a_defect_state_name_en VARCHAR (1000) NOT NULL,
  a_defect_state_desc_en TEXT,
  a_defect_state_name_ru VARCHAR (1000) NOT NULL,
  a_defect_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_defect_state_name_en,
        a_defect_state_name_ru
      ),
      UNIQUE (
        id
      )
);
--============================================================================--
INSERT INTO defects.d_defect_state (
  a_defect_state_name_en,
  a_defect_state_name_ru
)
VALUES
(
  'New',
  'Новое'
),
(
  'Accepted',
  'Принято'
),
(
  'Implemented',
  'Реализовано'
),
(
  'Rejected',
  'Отклонено'
),
(
  'Implementation',
  'На реализации'
),
(
  'Not implemented',
  'Не реализовано'
),
(
  'Deleted',
  'Удалено'
);
--============================================================================--
