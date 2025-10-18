import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:5001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Employee: {
        fields: {
          id: {
            read(existing, { readField }) {
              return readField('_id') || existing;
            }
          }
        }
      },
      Query: {
        fields: {
          getAllEmployees: {
            merge(_existing = [], incoming) {
              return incoming;
            }
          },
          getEmployeesByDepartment: {
            merge(_existing = [], incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
});

export default client;
