--============================================================================--
-- Person log (e_person_log)
--============================================================================--
CREATE TABLE log.e_person_log (
  id BIGSERIAL,
  e_operation_id BIGINT NOT NULL,
  e_person_id BIGINT NOT NULL,
  a_person_iin CHAR (12),
  a_person_last_name VARCHAR (100),
  a_person_first_name VARCHAR (100),
  a_person_middle_name VARCHAR (100),
  a_person_dob DATE,
  d_person_gender_id BIGINT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_operation_id
      ) REFERENCES operations.e_operation (id),
      FOREIGN KEY (
        e_person_id
      ) REFERENCES persons.e_person (id),
      FOREIGN KEY (
        d_person_gender_id
      ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--