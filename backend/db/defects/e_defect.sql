CREATE TABLE defects.e_defect (
  id SERIAL,
  d_defect_kind_id INTEGER NOT NULL DEFAULT 1,
  e_component_id INTEGER,
  e_subject_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR,
  d_defect_status_id INTEGER NOT NULL DEFAULT 1,
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_defect_kind_id
      ) REFERENCES defects.d_defect_kind (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        e_subject_id
      ) REFERENCES defects.e_subject (id),
      FOREIGN KEY (
        d_defect_status_id
      ) REFERENCES defects.d_defect_status (id)
);

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

CREATE TABLE defects.d_defect_status (
  id SERIAL NOT NULL,
  defect_status_name_en VARCHAR (1000) NOT NULL,
  defect_status_name_ru VARCHAR (1000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        defect_status_name_en
      ),
      UNIQUE (
        id
      )
);

INSERT INTO defects.d_defect_status (
  defect_status_name_en,
  defect_status_name_ru
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

CREATE VIEW defects.v_defects
AS
SELECT
  d.id "Код",
  s.a_name "Тема",
  d.a_name "Наименование",
  d.a_description "Описание",
  c.status "Статус"
FROM
  defects.e_defect d,
  defects.e_subject s,
  defects.d_defect_status c
WHERE
  d.subject_id = s.id
AND
  d.status_id = c.id
ORDER BY
  d.id
ASC;


SELECT
  s.a_name "Тема",
  d.a_name "Наименование",
  d.a_description "Описание"
FROM
  defects.e_defect d,
  defects.e_subject s,
  defects.d_defect_status c
WHERE
  d.subject_id = s.id
AND
  d.status_id = c.id
ORDER BY
  d.id
ASC;

CREATE VIEW defects.v_defects
AS
SELECT
  d.id "Код",
  ct.a_name "Компонент",
  s.a_name "Тема",
  d.a_name "Наименование",
  d.a_description "Описание"
FROM
  defects.e_defect d,
  defects.e_subject s,
  components.e_component ct,
  defects.d_defect_status c
WHERE
  d.subject_id = s.id
AND
  d.e_component_id = ct.id
AND
  d.status_id = c.id
ORDER BY
  d.id
ASC;
