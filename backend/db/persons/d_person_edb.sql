--============================================================================--
-- Person from external database (d_persons_edb)
--============================================================================--
CREATE TABLE persons.d_persons_edb (
  id BIGSERIAL,
  a_person_iin CHAR (12) NOT NULL,
  a_person_last_name VARCHAR (400) NOT NULL,
  a_person_first_name VARCHAR (300) NOT NULL,
  a_person_middle_name VARCHAR (500),
  a_person_dob DATE NOT NULL,
  d_person_gender_id CHAR (1) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        a_person_iin
      ),
      FOREIGN KEY (
        d_person_gender_id
      ) REFERENCES persons.d_person_gender (id)
);
--============================================================================--
