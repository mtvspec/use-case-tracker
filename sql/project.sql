CREATE OR REPLACE VIEW projects.e_project_view AS
  SELECT
    p.id,
    (
      SELECT row_to_json(customer.*) AS "projectCustomer"
      FROM
        (
          SELECT c.*
          FROM customers.e_customer_view c
          WHERE c.id = p."customerID"
        ) customer
    ) AS "projectCustomer",
    (
      SELECT row_to_json(manager.*) AS "projectManager"
      FROM
        (
          SELECT e.*
          FROM emp.e_emp_view e
          WHERE e.id = p."projectManagerID"
        ) manager
    ) AS "projectManager",
    (
      SELECT row_to_json(curator.*) AS "projectCurator"
      FROM
        (
          SELECT e.*
          FROM emp.e_emp_view e
          WHERE e.id = p."projectCuratorID"
        ) curator
    ) AS "projectCurator",
    p."projectName",
    p."projectDescription",
    p."officialProjectName",
    p."planStartDate",
    p."planEndDate",
    p."planBudget",
    p."factStartDate",
    p."factEndDate",
    p."factBudget",
    (
      SELECT count(m.id) AS count
      FROM
        projects.e_project_member m,
        projects.e_project_team t
      WHERE t.id = p.id AND t.id = m."teamID"
    ) AS "teamMembersCount",
    (
      SELECT row_to_json(state.*) AS state
      FROM
        (
          SELECT d.*
          FROM dict.e_dict_value d
          WHERE d.id = p."stateID"
        ) state
    ) AS state,
    p."isDeleted",
    (
      SELECT row_to_json(cre.*) AS "createdBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = p."createdBy"
        ) cre
    ) AS "createdBy",
    p."createdAt",
    (
      SELECT row_to_json(upd.*) AS "updatedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = p."updatedBy"
        ) upd
    ) AS "updatedBy",
    p."updatedAt",
    (
      SELECT row_to_json(del.*) AS "deletedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = p."deletedBy"
        ) del
    ) AS "deletedBy",
    p."deletedAt",
    (
      SELECT row_to_json(mod.*) AS "modifiedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = p."modifiedBy"
        ) mod
    ) AS "modifiedBy",
    p."modifiedAt"
  FROM projects.e_project p
  ORDER BY p.id ASC;
