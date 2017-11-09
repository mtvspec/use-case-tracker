import { convertData } from './../../utils';

const queries = {
  systems: {
    INSERT_COMPONENT: (data) => {
      return `
      INSERT INTO components.e_component (
        "componentID",
        name,
        description,
        "createdBy",
        "modifiedBy"
      ) VALUES (
        ${data.componentID},
        '${data.name}',
        ${convertData(data.description)},
        ${data.user.id},
        ${data.user.id}
      ) RETURNING *;`
    },
    UPDATE_COMPONENT: (data) => {
      return `
      UPDATE components.e_component
      SET
        "typeID" = ${convertData(data.typeID)},
        name = '${data.name}',
        description = ${convertData(data.description)},
        "updatedBy" = ${data.user.id},
        "updatedAt" = 'now()',
        "modifiedBy" = ${data.user.id},
        "modifiedAt" = 'now()'
      WHERE id = ${data.id}
      RETURNING *;`
    },
  }
}

export default queries