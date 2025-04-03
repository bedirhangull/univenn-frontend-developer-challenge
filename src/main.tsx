import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { store, persistor } from '@/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://staging-api.hrpanda.co/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsbnZvcTZzYjAwNmQzd21xZHJhNmIxZDIiLCJpYXQiOjE3NDM2NzcwNDksImV4cCI6MTc3NTIzNDY0OX0.khKc_3ZTbtP2OYmfozkX3YV5aHiJ3HvlR2Jpu3saCRo'

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      'x-apollo-operation-name': 'getCompanyApplicantList',
      'apollo-require-preflight': 'true',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  }
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)