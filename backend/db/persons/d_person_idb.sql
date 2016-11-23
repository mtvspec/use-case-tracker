--============================================================================--
-- Person from internal database
--============================================================================--
CREATE TABLE persons.d_persons_idb (
  id BIGSERIAL,
  a_person_iin CHAR (12),
  a_person_last_name VARCHAR (400),
  a_person_first_name VARCHAR (300),
  a_person_middle_name VARCHAR (500),
  a_person_dob DATE,
  a_person_gender_id CHAR (1),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        a_person_iin
      ),
      FOREIGN KEY (
        a_person_gender_id
      ) REFERENCES persons.d_gender (id)
);
--============================================================================--
