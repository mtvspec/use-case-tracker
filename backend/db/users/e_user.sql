--============================================================================--
-- User (e_user)
--============================================================================--
CREATE TABLE users.e_user (
  id BIGSERIAL NOT NULL,
  e_person_id BIGINT NOT NULL,
  u_username VARCHAR (20) NOT NULL,
  u_password VARCHAR (4000),
  a_user_email VARCHAR (100) NOT NULL,
  d_user_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        u_username
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_user_email
      ),
      FOREIGN KEY (
        e_person_id
      ) REFERENCES persons.e_person (id),
      FOREIGN KEY (
        d_user_state_id
      ) REFERENCES users.d_user_state (id)
);
--============================================================================--
