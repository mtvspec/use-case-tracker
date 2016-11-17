CREATE TABLE emp.d_emp_state (
  id SERIAL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO emp.d_emp_state (
  id
)
VALUES
(
  1
);

CREATE TABLE emp.tr_emp_state (
  id SERIAL,
  state_en VARCHAR (1000) NOT NULL,
  state_ru VARCHAR (1000),
  state_kz VARCHAR (1000),
  description VARCHAR (4000),
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        state_en
      ),
      UNIQUE (
        state_ru
      ),
      UNIQUE (
        state_kz
      ),
      UNIQUE (
        description
      ),
      UNIQUE (
        state_en,
        state_ru,
        state_kz,
        description
      )
);

INSERT INTO emp.tr_emp_state (
  state_en
)
VALUES
(
  'Created'
);

CREATE TABLE emp.r_emp_state_tr (
  id SERIAL,
  state_id INTEGER NOT NULL,
  translate_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (id),
      FOREIGN KEY (state_id) REFERENCES emp.d_emp_state (id),
      FOREIGN KEY (translate_id) REFERENCES emp.tr_emp_state (id)
);

INSERT INTO emp.r_emp_state_tr (
  state_id,
  translate_id
)
VALUES
(
  1,
  1
);
