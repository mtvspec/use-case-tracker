create table persons.e_person (
  id serial,
  iin char(12),
  last_name varchar (400) not null,
  first_name varchar (300) not null,
  middle_name varchar (500),
  dob date not null,
  gender_id char(1) not null,
    cr_date timestamp with time zone not null default localtimestamp,
    primary key (id),
    unique (iin),
    foreign key (gender_id) references persons.d_gender (id)
);
