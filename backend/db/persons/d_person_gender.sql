--============================================================================--
-- Person gender (d_person_gender)
--============================================================================--
CREATE TABLE persons.d_person_gender (
  id CHAR (1) NOT NULL,
  a_person_gender VARCHAR (100) NOT NULL,
    PRIMARY KEY (
      a_person_gender
    ),
    UNIQUE (
      id
    )
);
--============================================================================--
INSERT INTO
  persons.d_person_gender (
    id,
    a_person_gender
  )
VALUES
(
  'M',
  'Мужской'
),
(
  'F',
  'Женский'
);
--============================================================================--
