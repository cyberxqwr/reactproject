import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const backendUri = 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
    uri: backendUri,
});

const authLink = setContext((_, { headers }) => {
    
    const token = localStorage.getItem('authToken');

    return {
        headers: {
            ...headers,
            
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
});

export default client;