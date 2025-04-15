import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; // Importuojame setContext

const backendUri = 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
    uri: backendUri,
});

// 3. Sukuriame Authentication link'ą (middleware)
// Šis link'as pasileis PRIEŠ kiekvieną GraphQL užklausą
const authLink = setContext((_, { headers }) => {
    // Gauname autentifikacijos token'ą iš localStorage (kurį išsaugojote per AuthContext)
    const token = localStorage.getItem('authToken'); // Įsitikinkite, kad raktas ('authToken') sutampa su naudojamu AuthContext

    // Grąžiname objektą su (galbūt papildytomis) antraštėmis (headers)
    return {
        headers: {
            ...headers, // Išlaikome visas esamas antraštes
            // Pridedame Authorization antraštę su Bearer token'u, jei tokenas egzistuoja
            // Jei tokeno nėra, pridedama tuščia reikšmė arba nieko (priklauso nuo backend logikos, bet tuščia dažniausiai tinka)
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// 4. Sukuriame Apollo Client instanciją
const client = new ApolloClient({
    // Sujungiame authLink ir httpLink. Svarbu: authLink turi eiti Pirmas,
    // kad Authorization antraštė būtų pridėta prieš siunčiant užklausą per httpLink.
    link: authLink.concat(httpLink),

    // Naudojame standartinį InMemoryCache duomenų kešavimui kliento pusėje
    cache: new InMemoryCache(),

    // Galima pridėti numatytuosius nustatymus (defaultOptions), pvz., fetchPolicy
    // defaultOptions: {
    //   watchQuery: { fetchPolicy: 'cache-and-network' },
    //   query: { fetchPolicy: 'network-only' }, // Pvz., visada gauti šviežiausius duomenis užklausoms
    // },
});

// 5. Eksportuojame sukonfigūruotą klientą
export default client;
