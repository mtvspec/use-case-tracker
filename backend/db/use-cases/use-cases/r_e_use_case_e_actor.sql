--============================================================================--
-- Use case - Actor (r_e_use_case_e_actor)
--============================================================================--
CREATE TABLE use_cases.r_e_use_case_e_actor (
  id BIGSERIAL NOT NULL,
  e_use_case_id INTEGER NOT NULL,
  e_actor_id INTEGER NOT NULL,
    PRIMARY KEY (
      e_use_case_id,
      e_actor_id
    ),
    UNIQUE (
      id
    ),
    FOREIGN KEY (
      e_use_case_id
    ) REFERENCES use_cases.e_use_case (id),
    FOREIGN KEY (
      e_actor_id
    ) REFERENCES use_cases.e_actor (id)
);
--============================================================================--
