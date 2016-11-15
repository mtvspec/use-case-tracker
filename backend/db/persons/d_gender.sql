create table persons.d_gender (
  id char(1) not null,
  gender varchar (100) not null,
    primary key (id),
    unique (gender)
);

insert into persons.d_gender values ('M', 'Мужской');
insert into persons.d_gender values ('F', 'Женский'); 
