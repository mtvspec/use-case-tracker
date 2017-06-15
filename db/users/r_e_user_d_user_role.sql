--============================================================================--
-- User - Role (r_e_user_d_user_role)
--============================================================================--
CREATE TABLE users.r_e_user_d_user_role (
  id BIGINT,
  e_user_id BIGINT NOT NULL,
  d_user_role_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        d_user_role_id
      ) REFERENCES users.d_user_role (id)
);
--============================================================================--
