--============================================================================--
-- Project member (e_project_member)
--============================================================================--
CREATE TABLE projects.e_project_member (
  id BIGSERIAL,
  e_project_team_id BIGINT NOT NULL,
  e_emp_id BIGINT NOT NULL,
  d_project_member_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_project_team_id
      ) REFERENCES projects.e_project_team (id),
      FOREIGN KEY (
        e_emp_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        d_project_member_state_id
      ) REFERENCES projects.d_project_member_state (id)
);
--============================================================================--
