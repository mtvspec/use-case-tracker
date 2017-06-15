--============================================================================--
-- User role - Operation (r_d_user_role_d_operation)
--============================================================================--
CREATE TABLE r_d_user_role_d_project_operation (
  id BIGSERIAL,
  d_user_role_id INTEGER NOT NULL,
  d_project_operation_type_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        d_user_role_id,
        d_project_operation_type_id
      ),
      FOREIGN KEY (
        d_user_role_id
      ) REFERENCES users.d_user_role (id),
      FOREIGN KEY (
        d_project_operation_type_id
      ) REFERENCES projects.d_project_operation (id)
);
--============================================================================--
