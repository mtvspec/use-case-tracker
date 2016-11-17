CREATE TABLE components.d_component_type (
  id SERIAL,
  component_type_en VARCHAR (1000) NOT NULL,
  component_description_en VARCHAR (4000) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        component_type
      )
);

INSERT INTO
  components.d_component_type (
    component_type_en
  )
VALUES
(
  'Information system'
),
(
  'Subsystem'
);
