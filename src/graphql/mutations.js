import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
 
  mutation Login($email: String!, $password: String!) {

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

export const REGISTER_MUTATION = gql`
 
  mutation Register($email: String!, $password: String!, $name: String!, $surname: String!) {

    register(email: $email, password: $password, name: $name, surname: $surname) {

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

export const CREATE_BLOG_MUTATION = gql`

  mutation CreateBlog($name: String!, $desc: String!, $imagepath: String) {
  createBlog(name: $name, desc: $desc, imagepath: $imagepath) {
    id
    name
    desc
    createdby
    imageUrl
    imagepath
    createdon
  }
}
`;