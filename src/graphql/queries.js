import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser { # Pavadinimas turi atitikti Query tipą jūsų backend schemoje
      id
      email
      name      # Pridėkite laukus, kuriuos grąžina jūsų backend
      surname
      # ... kiti reikalingi vartotojo laukai
    }
  }
`;
