--============================================================================--
-- Card (e_card)
--============================================================================--
CREATE TABLE cards.e_card (
  id BIGSERIAL,
  e_author_id BIGINT NOT NULL,
  e_assignee_id BIGINT NOT NULL,
  a_card_name VARCHAR (1000) NOT NULL,
  a_card_desc TEXT,
  d_card_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_author_id
      ) REFERENCES projects.e_project_member (id),
      FOREIGN KEY (
        e_assignee_id
      ) REFERENCES projects.e_project_member (id),
      FOREIGN KEY (
        d_card_state_id
      ) REFERENCES cards.d_card_state (id)
);
--============================================================================--
