create or replace view EMP.E_EMP_VIEW as
  select
    E.ID,
    (select row_to_json(PERSON.*) as PERSON
     from (select P.*
           from PERSONS.E_PERSON_VIEW P
           where E."personID" = P.ID) PERSON)      as PERSON,
    (select row_to_json(PU.*) as "positionalUnit"
     from (select PU.*
           from ORGANIZATIONS.E_POSITIONAL_UNIT_VIEW PU
           where E."positionalUnitID" = PU.ID) PU) as "positionalUnit",
    E.SALARY,
    (select row_to_json(STATE.*) as STATE
     from (select D.*
           from DICT.E_DICT_VALUE D
           where D.ID = E."stateID") STATE)        as STATE,
    E."isDeleted",
    (select row_to_json(CRE.*) as "createdBy"
     from (select U.*
           from USERS.E_USER_VIEW U
           where E."createdBy" = U.ID) CRE)        as "createdBy",
    E."createdAt",
    (select row_to_json(UPD.*) as "updatedBy"
     from (select U.*
           from USERS.E_USER_VIEW U
           where E."updatedBy" = U.ID) UPD)        as "updatedBy",
    E."updatedAt",
    (select row_to_json(DEL.*) as "deletedBy"
     from (select U.*
           from USERS.E_USER_VIEW U
           where E."deletedBy" = U.ID) DEL)        as "deletedBy",
    E."deletedAt",
    (select row_to_json(MOD.*) as "modifiedBy"
     from (select U.*
           from USERS.E_USER_VIEW U
           where E."modifiedBy" = U.ID) MOD)       as "modifiedBy",
    E."modifiedAt"
  from EMP.E_EMP E
  order by E.ID;