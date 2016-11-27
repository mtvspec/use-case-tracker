--============================================================================--
-- Project team (e_project_team)
--============================================================================--
CREATE TABLE projects.e_project_team (
  id BIGSERIAL NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        id
      )
);
--============================================================================--
