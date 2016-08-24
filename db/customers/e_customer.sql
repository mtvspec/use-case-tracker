CREATE TABLE customers.e_customer (
  id INTEGER,
  name VARCHAR (1000) NOT NULL,
  description VARCHAR (4000),
    PRIMARY KEY (id)
);

CREATE TABLE customers.r_customer (
  id SERIAL,
  e_customer_id INTEGER NOT NULL,
  e_organization_id INTEGER,
  e_person_id INTEGER,
   PRIMARY KEY (id)
);
