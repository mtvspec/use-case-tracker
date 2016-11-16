CREATE TABLE ontology.r_ontology_link (
  id SERIAL,
  kind_id INTEGER NOT NULL,
  source_element_id INTEGER NOT NULL,
  target_element_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        kind_id
      ) REFERENCES ontology.e_ontology_element (id),
      FOREIGN KEY (
        source_element_id
      ) REFERENCES ontology.e_ontology_element (id),
      FOREIGN KEY (
        target_element_id
      ) REFERENCES ontology.e_ontology_element (id)
);
