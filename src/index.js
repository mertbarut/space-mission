import * as ReactDOMClient from 'react-dom/client';
import App from './App'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.spacex.land/graphql/',
  })
})

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  )