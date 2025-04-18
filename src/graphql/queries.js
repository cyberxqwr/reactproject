import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      email
      name
      surname
    }
  }
`;

export const GET_BLOGS_QUERY = gql`
  query GetAllBlogs {
    blogs {
      id
      name
      desc
      createdby
      createdon
      imageUrl
    }
  }
`;

export const GET_BLOGS_BY_USER_QUERY = gql`
  query GetAllBlogsByUser{
    blogsUser {
      id
      name
      desc
      createdon
      imageUrl
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlogByID($id: ID!){
    blogId(id: $id) {
      id
      name
      desc
      createdon
      imagepath
      imageUrl
    }
  }
`;
