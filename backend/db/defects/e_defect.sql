--============================================================================--
-- Defect (e_defect)
--============================================================================--
CREATE TABLE defects.e_defect (
  id BIGSERIAL NOT NULL,
  d_defect_kind_id INTEGER NOT NULL DEFAULT 1,
  e_component_id BIGINT NOT NULL,
  e_use_case_slice_id BIGINT NOT NULL,
  e_defect_source_id BIGINT NOT NULL,
  a_defect_name VARCHAR (1000) NOT NULL,
  a_defect_desc VARCHAR (4000),
  d_defect_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_component_id,
        e_use_case_slice_id,
        e_source_id,
        a_defect_name
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
        e_source_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        d_defect_state_id
      ) REFERENCES defects.d_defect_state (id)
);
COMMENT ON TABLE defects.e_defect IS 'E Замечание';
--============================================================================--
