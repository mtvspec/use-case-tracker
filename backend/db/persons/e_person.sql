--============================================================================--
-- Person (e_person)
--============================================================================--
-- TODO: test with persons db structure
CREATE TABLE test.e_person (
  id BIGSERIAL,
  d_person_source_id INTEGER NOT NULL,
  e_person_edb_id BIGINT,
  e_person_idb_id BIGINT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_person_edb_id
      ) REFERENCES persons.d_persons_gdb (id),
      FOREIGN KEY (
        e_person_idb_id
      ) REFERENCES persons.d_persons_idb (id)
);
-- TODO: update quieries
INSERT INTO
  persons.e_person (
    a_person_iin,
    a_person_last_name,
    a_person_first_name,
    a_person_middle_name,
    a_person_dob,
    a_person_gender_id
  )
VALUES (
  '871215301496',
  'Маусумбаев',
  'Тимур',
  'Владимирович',
  '1987-12-15',
  'M'
);
--============================================================================--
