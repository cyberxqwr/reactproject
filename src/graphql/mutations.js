import { gql } from '@apollo/client';

// LOGIN_MUTATION: Siunčia email ir password, tikisi gauti token ir user info
// Ši konstanta bus importuojama į jūsų LoginPage komponentą
export const LOGIN_MUTATION = gql`
 
  mutation LoginUser($email: String!, $password: String!) {

    login(email: $email, password: $password) {

      token
      user {
        id
        email
        name
        surname
      }
    }
  }
`;