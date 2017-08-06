SELECT
  id,
  ROW_TO_JSON(customer) "aProjectCustomer"
      FROM (
        SELECT
          c.id,
          c."aCustomerName",
          c."aCustomerDesc"
        FROM
          customers.e_customer c,
          projects.e_project p
        WHERE p."eCustomerID" = c.id        
      ) customer
FROM
  projects.e_project;

SELECT
  ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(projects))) "projects"
FROM (
  SELECT
    o."aOrganizationBin",
    o."aOrganizationShortName",
    o."aOrganizationOfficialName",
    ROW_TO_JSON(customer) "aProjectCustomer"
      FROM (
        SELECT
          c.id,
          c."aCustomerName",
          c."aCustomerDesc"
        FROM
          customers.e_customer c,
          projects.e_project p
        WHERE p."eCustomerID" = c.id        
      ) customer,
    ROW_TO_JSON(manager) "aProjectManager"
      FROM (
        SELECT
          p.id,
          p."lastName",
          p."firstName",
          p."middleName"
        FROM
          persons.e_person p,
          emp.e_emp e,
          projects.e_project pr
        WHERE pr."eProjectManagerID" = e.id
        AND e."ePersonID" = p.id
      ) manager,
    pr."aPlanStartDate",
    pr."aPlanEndDate",
    pr."aPlanBudget",
    pr."aFactStartDate",
    pr."aFactEndDate",
    pr."aFactBudget",
    ROW_TO_JSON(curator) "aProjectCurator"
      FROM (
        SELECT
          p.id,
          p."lastName",
          p."firstName",
          p."middleName"
        FROM
          persons.e_person p,
          emp.e_emp e,
          projects.e_project pr
        WHERE pr."eProjectCuratorID" = e.id
        AND e."ePersonID" = p.id
      ) curator
  FROM
    projects.e_project pr,
    organizations.e_organization o
  WHERE
    pr."eCustomerID" = c.id
  AND c."eOrganizationID" =  o.id
) projects;


SELECT
  ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(projects))) "projects"
FROM (
  SELECT
    o."aOrganizationBin",
    o."aOrganizationShortName",
    o."aOrganizationOfficialName",
    c."aCustomerName"||' '||c."aCustomerDesc" "aProjectCustomer",
    p."lastName"||' '||p."firstName"||' '||p."middleName" "aProjectManager",
    pr."aPlanStartDate",
    pr."aPlanEndDate",
    pr."aPlanBudget",
    pr."aFactStartDate",
    pr."aFactEndDate",
    pr."aFactBudget",
    cr."lastName"||' '||cr."firstName"||' '||cr."middleName" "aProjectCurator"
  FROM
    projects.e_project pr,
    organizations.e_organization o,
    customers.e_customer c,
    persons.e_person p,
    persons.e_person cr,
    emp.e_emp e,
    emp.e_emp pcr
  WHERE
    pr."eCustomerID" = c.id
  AND c."eOrganizationID" =  o.id
  AND pr."eProjectManagerID" = e.id
  AND e."ePersonID" = p.id
  AND pr."eProjectCuratorID" = pcr.id
  AND pcr."ePersonID" = cr.id
) projects;

SELECT

  SELECT
  ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(db)))
  FROM (
    SELECT
    db.oid "db_id",
    db.datname "db_name",
    (
      SELECT
        ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(sc)))
      FROM (
        SELECT
          sc.schema_name "schema_name",
          (
            SELECT
              ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(tb)))
            FROM (
              SELECT
              tb.table_name "table_name",
              tb.table_type "table_type",
              (
                SELECT
                ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(cn)))
                FROM (
                  SELECT
                    cn.column_name "columnName",
                    cn.column_default "defaultValue",
                    cn.is_nullable "isNullable",
                    cn.data_type "dataType",
                    cn.ordinal_position "order"
                  FROM
                    information_schema.columns cn
                  WHERE cn.table_name = tb.table_name
                ) cn
              ) AS "columns"
              FROM
              information_schema.tables tb
              WHERE tb.table_schema = sc.schema_name
            ) tb
          ) AS "tables"
        FROM
          information_schema.schemata sc
        WHERE sc.schema_owner = db.datname
        AND sc.schema_name NOT IN ('pg_catalog', 'information_schema')
      ) sc
    ) AS "schemas"
  FROM
    pg_database db
  WHERE db.datistemplate = false
  ) db;