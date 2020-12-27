import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import cookies from 'js-cookie';
import { createGlobalStyle } from 'styled-components';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';
import { setContext } from '@apollo/client/link/context';

// Styled Components
const GlobalStyle = createGlobalStyle`
  body, html {
    background-color: #f4f4f2;
    width: 100%;
    min-height: 100vh;
    font-family: 'Inter', 'sans-serif';
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: rgb(32, 34, 35);
  }
`;

// GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  const token = cookies.get('jwt');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({ 
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    {/* @ts-ignore */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
