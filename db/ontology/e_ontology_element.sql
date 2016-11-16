CREATE TABLE ontology.d_ontology_element_kind (
  id SERIAL,
  a_kind VARCHAR (1000) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (id),
      UNIQUE (a_kind)
);

INSERT INTO ontology.d_ontology_element_kind (
  a_kind
)
VALUES
(
  'Dictionary'
),
(
  'Value'
);

CREATE TABLE ontology.e_ontology_element (
  id SERIAL,
  kind_id INTEGER NOT NULL,
  a_element_name VARCHAR (1000) NOT NULL,
  a_element_desc VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        kind_id
      ) REFERENCES ontology.d_ontology_element_kind (id),
      UNIQUE (
        a_element_name
      ),
      UNIQUE (
        a_element_desc
      ),
      UNIQUE (
        a_element_name,
        a_element_desc
      )
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  1,
  'Вид проекта',
  'Данный справочник используется для управления видами проектов'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  1,
  'Статус проекта',
  'Данный справочник используется для управления статусами проектов'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  2,
  'Информационный объект',
  'Данный справочник используется для управления информационными объектами'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  1,
  'Вид связи',
  'Данный справочник используется для управления видами связей'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  2,
  'Ассоциация',
  'Данный вид связи используется для связывания исходного элемента, свидетельствующем о вероятном наличии целевого элемента'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  2,
  'Анти-Ассоциация',
  'Данный вид связи используется для связывания исходного элемента, свидетельствующим о вероятном отсутствии целевого элемента'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  2,
  'Противоречие',
  'Данный вид связи используется для связывания исходного элемента, свидетельствующем об отсутствии целевого элемента'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  2,
  'Последовательность',
  'Данный вид связи используется для связывания исходного элемента с целевым элементом, последующим после исходного'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  2,
  'Проект',
  'Информационный объект используется для моделирования проектов, их хранения и управления ими'
);

INSERT INTO ontology.e_ontology_element (
  kind_id,
  a_element_name,
  a_element_desc
)
VALUES
(
  1,
  'Виды операций',
  'Данный справочник используется для управления видами операций над информационными объектами'
);
