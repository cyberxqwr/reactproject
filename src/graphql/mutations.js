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

export const EDIT_BLOG_MUTATION = gql`

  mutation UpdateBlog($id: ID!, $name: String!, $desc: String!, $imagepath: String!) {
  updateBlog(id: $id, name: $name, desc: $desc, imagepath: $imagepath) {
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

export const DELETE_BLOG_MUTATION = gql`

  mutation DeleteBlog($id: ID!) {
  deleteBlog(id: $id)
}
`;