--============================================================================--
-- Use-case Model - Use case (r_e_use_case_model_e_use_case)
--============================================================================--
CREATE TABLE use_cases.r_e_use_case_model_e_use_case (
  r_e_use_case_model_e_use_case_id BIGSERIAL NOT NULL,
  e_use_case_model_id INTEGER NOT NULL,
  e_use_case_id INTEGER NOT NULL,
    PRIMARY KEY (
      e_use_case_model_id,
      e_use_case_id
    ),
    UNIQUE (
      r_e_use_case_model_e_use_case_id
    ),
    FOREIGN KEY (
      e_use_case_model_id
    ) REFERENCES use_cases.e_use_case_model (e_use_case_model_id),
    FOREIGN KEY (
      e_use_case_id
    ) REFERENCES use_cases.e_use_case (e_use_case_id)
);
--============================================================================--
