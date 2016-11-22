--============================================================================--
-- Use case states (d_use_case_state)
--============================================================================--
CREATE TABLE use_cases.d_use_case_state (
  id SERIAL NOT NULL,
  d_use_case_state_name_en VARCHAR (1000) NOT NULL,
  d_use_case_state_desc_en TEXT,
  d_use_case_state_name_ru VARCHAR (1000),
  d_use_case_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        d_use_case_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        d_use_case_state_name_ru
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_state (
    d_use_case_state_name_en,
    d_use_case_state_desc_en
  )
VALUES
(
  'Created',
  'When the use case is created'
),
(
  'Goal Established',
  'When the goal of the use case has been established'
),
(
  'Story Structure Understood',
  'When the structure of the use-case narrative has been understood enough for the team to start work identifying and implementing the first use-case slices'
),
(
  'Simplest Story Fulfilled',
  'When the system fulfills the simplest story that allows a user to achieve the goal'
),
(
  'Sufficient Stories Fulfilled',
  'When the system fulfills enough of the stories to provide a usable solution'
),
(
  'All Stories Fulfilled',
  'When the system fulfills all the stories told by the use case'
);
--============================================================================--
