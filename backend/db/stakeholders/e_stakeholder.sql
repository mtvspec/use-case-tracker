--============================================================================--
-- Stakeholder (e_stakeholder)
--============================================================================--
CREATE TABLE stakeholders.e_stakeholder (
  id BIGSERIAL,
  e_person_id INTEGER NOT NULL,
  a_stakeholder_desc TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_person_id
      ) REFERENCES persons.e_person (id)
);
--============================================================================--
