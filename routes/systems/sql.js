const Queries = {
  systems: {
    SELECT_ALL_SYSTEMS() {
      return `
      SELECT
        id,
        d_system_kind_id "aSystemKindID",
        d_system_type_id "aSystemTypeID",
        a_system_name "aSystemName",
        a_system_desc "aSystemDesc",
        d_system_state_id "aSystemStateID",
        is_deleted "isDeleted"
      FROM
        systems.e_system
      ORDER BY
        id
      ASC;
      `;
    },
    INSERT_SYSTEM(system, session, user) {
      console.log('system:\n', system);
      console.log('session:\n', session);
      console.log('user:\n', user);
      return `
      SELECT
        systems.create_system (
          v_d_system_kind_id := ${system.aSystemKindID},
          v_d_system_type_id := ${system.aSystemTypeID},
          v_a_system_name := '${system.aSystemName}',
          v_a_system_desc := '${system.aSystemDesc}',
          v_e_session_id := ${session.id},
          v_e_user_id := ${user.id}
        );
      `;
    }
  }
}

module.exports = Queries;
