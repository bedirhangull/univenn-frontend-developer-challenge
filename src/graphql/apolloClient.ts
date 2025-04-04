import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: "https://staging-api.hrpanda.co/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsbnZvcTZzYjAwNmQzd21xZHJhNmIxZDIiLCJpYXQiOjE3NDM2NzcwNDksImV4cCI6MTc3NTIzNDY0OX0.khKc_3ZTbtP2OYmfozkX3YV5aHiJ3HvlR2Jpu3saCRo";
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
        "x-apollo-operation-name": "getCompanyApplicantList",
        "apollo-require-preflight": "true",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
};
