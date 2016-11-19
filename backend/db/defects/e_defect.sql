--============================================================================--
-- Defect
--============================================================================--
CREATE TABLE defects.e_defect (
  id SERIAL NOT NULL,
  d_defect_kind_id INTEGER NOT NULL DEFAULT 1,
  e_component_id INTEGER,
  e_use_case_slice_id INTEGER NOT NULL,
  e_subject_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_defect_state_id INTEGER NOT NULL DEFAULT 1,
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_use_case_slice_id,
        a_name
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        d_defect_kind_id
      ) REFERENCES defects.d_defect_kind (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        e_use_case_slice_id
      ) REFERENCES use_cases.use_case_slices (id),
      FOREIGN KEY (
        e_subject_id
      ) REFERENCES defects.e_subject (id),
      FOREIGN KEY (
        d_defect_state_id
      ) REFERENCES defects.d_defect_state (id)
);
--------------------------------------------------------------------------------
