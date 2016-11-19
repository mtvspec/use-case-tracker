CREATE TABLE defects.d_defect_kind (
  id SERIAL,
  defect_kind_name_en VARCHAR (1000) NOT NULL,
  defect_kind_name_ru VARCHAR (1000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (id),
      UNIQUE (kind)
);

INSERT INTO defects.d_defect_kind (
  d_defect_kind_name_en,
  d_defect_kind_name_ru
)
VALUES
(
  'Bug',
  'Замечание'
),
 (
   'New requirement',
   'Новое требование'
 );
