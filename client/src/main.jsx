import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ApolloClient,InMemoryCache, ApolloProvider,gql, HttpLink} from'@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5001'
  })
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
