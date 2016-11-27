--============================================================================--
-- Defect state (d_defect_state)
--============================================================================--
CREATE TABLE defects.d_defect_state (
  id SERIAL NOT NULL,
  defect_state_name_en VARCHAR (1000) NOT NULL,
  defect_state_desc_en VARCHAR (4000),
  defect_state_name_ru VARCHAR (1000) NOT NULL,
  defect_state_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        defect_state_name_en,
        defect_state_name_ru
      ),
      UNIQUE (
        id
      )
);
--============================================================================--
INSERT INTO defects.d_defect_state (
  defect_state_name_en,
  defect_state_name_ru
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
  'Deleted',
  'Удалено'
);
--============================================================================--
