--============================================================================--
-- Use-case slice (e_use_case_slice)
--============================================================================--
CREATE TABLE use_case_slices.e_use_case_slice (
  id BIGSERIAL NOT NULL,
  e_use_case_id BIGINT NOT NULL,
  e_component_id BIGINT NOT NULL,
  a_use_case_slice_code CHAR (3),
  a_use_case_slice_name VARCHAR (1000) NOT NULL,
  a_use_case_slice_desc TEXT,
  a_story_points INTEGER,
  d_use_case_slice_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_use_case_id,
        e_component_id,
        a_use_case_slice_name
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        e_use_case_id
      ) REFERENCES use_cases.e_use_case (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        d_use_case_slice_state_id
      ) REFERENCES use_case_slices.d_use_case_slice_state (id)
);
--============================================================================--
CREATE TABLE use_case_slices.e_use_case_slice_log (
  id SERIAL,
  e_use_case_slice_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_use_case_slice_state_id INTEGER NOT NULL ,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_use_case_slice_id
      ) REFERENCES use_case_slices.e_use_case_slice (id),
      FOREIGN KEY (
        d_use_case_slice_status_id
      ) REFERENCES use_case_slices.d_use_case_state (id)
);
--============================================================================--
CREATE TABLE use_case_slices.f_use_case_slice_status (
  id SERIAL,
  e_use_case_slice_id INTEGER NOT NULL,
  d_use_case_slice_state_id INTEGER NOT NULL DEFAULT 1,
  e_user_id INTEGER NOT NULL,
  a_state_change_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_use_case_slice_id
    ) REFERENCES use_case_slices.e_use_case_slice (id),
    FOREIGN KEY (
      d_use_case_slice_status_id
    ) REFERENCES use_case_slices.d_use_case_state (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id)
);

CREATE VIEW use_case_slices.v_use_case_slices
AS
SELECT
  u.id "Код",
  ct.a_name "Компонент",
  u.a_name "Наименование",
  u.a_description "Описание",
  s.state_en "Статус"
FROM
  use_case_slices.e_use_case_slice u,
  components.e_component ct,
  use_case_slices.d_use_case_slice_state s
WHERE
  u.e_component_id = ct.id
AND
  u.d_use_case_slice_state_id = s.id
ORDER BY
  ct.a_name,
  u.a_name
ASC;
