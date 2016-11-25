CREATE TABLE projects.e_project_team (
  id SERIAL NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        id
      )
);
