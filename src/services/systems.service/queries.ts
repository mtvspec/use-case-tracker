import { convertData } from './../../utils';

const queries = {
  systems: {
    INSERT_COMPONENT: (data) => {
      return `
      INSERT INTO systems.e_component (
        "component",
        name,
        description,
        "createdBy",
        "modifiedBy"
      ) VALUES (
        ${data.component},
        '${data.name}',
        ${convertData(data.description)},
        ${data.user.id},
        ${data.user.id}
      ) RETURNING *;`
    },
    UPDATE_COMPONENT: (data) => {
      return `
      UPDATE systems.e_component
      SET
        "type" = ${convertData(data.type)},
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