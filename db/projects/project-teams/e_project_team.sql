--============================================================================--
-- Project team (e_project_team)
--============================================================================--
CREATE TABLE projects.e_project_team (
  id BIGSERIAL,
  a_project_team_name VARCHAR NOT NULL,
  a_project_team_desc TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        a_project_team_name
      )
);
--============================================================================--