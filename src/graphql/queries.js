import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser { # Pavadinimas turi atitikti Query tipą jūsų backend schemoje
      id
      email
      name      # Pridėkite laukus, kuriuos grąžina jūsų backend
      surname
      # ... kiti reikalingi vartotojo laukai
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
