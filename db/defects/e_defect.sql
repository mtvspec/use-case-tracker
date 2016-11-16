CREATE TABLE defects.e_defect (
  id SERIAL,
  kind_id INTEGER NOT NULL DEFAULT 1,
  subject_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR,
  status_id INTEGER NOT NULL DEFAULT 1,
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        kind_id
      ) REFERENCES defects.d_defect_kind (id),
      FOREIGN KEY (
        subject_id
      ) REFERENCES defects.e_subject (id),
      FOREIGN KEY (
        status_id
      ) REFERENCES defects.d_defect_status (id)
);

CREATE TABLE defects.d_defect_kind (
  id SERIAL,
  kind VARCHAR (1000) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (id),
      UNIQUE (kind)
);

INSERT INTO defects.d_defect_kind (
  kind
)
VALUES
(
  'Замечание'
),
 (
   'Новое требование'
 );

CREATE TABLE defects.d_defect_status (
  id SERIAL,
  status VARCHAR (1000) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        status
      )
);

INSERT INTO defects.d_defect_status (
  status
)
VALUES
(
  'Новое'
),
(
  'Принято'
),
(
  'Реализовано'
),
(
  'Отклонено'
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

SELECT
  d.id "Код",
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
