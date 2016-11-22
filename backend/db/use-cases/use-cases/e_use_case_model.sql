--============================================================================--
-- Use case model (e_use_case_model)
--============================================================================--
CREATE TABLE use_cases.e_use_case_model (
  id BIGSERIAL,
  e_component_id INTEGER NOT NULL,
  e_use_case_model_name VARCHAR (1000) NOT NULL,
  e_use_case_model_desc TEXT,
  d_use_case_model_state_id INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_component_id
    ) REFERENCES components.e_component (id),
    FOREIGN KEY (
      d_use_case_model_state_id
    ) REFERENCES use_cases.d_use_case_model_state (id)
);
--============================================================================--
