--============================================================================--
-- Actor (e_actor)
--============================================================================--
CREATE TABLE use_cases.e_actor (
  id BIGSERIAL,
  d_actor_type_id INTEGER NOT NULL,
  a_actor_short_name VARCHAR (1000) NOT NULL,
  a_actor_long_name VARCHAR (4000),
  a_actor_desc TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_actor_type_id
      ) REFERENCES use_cases.d_actor_type (id)
);
--============================================================================--
