--============================================================================--
-- Actor
--============================================================================--
CREATE TABLE use_cases.e_actor (
  id SERIAL,
  a_short_name VARCHAR (100),
  a_long_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      )
);
--============================================================================--
