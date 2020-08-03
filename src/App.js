import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import { ErrorBoundary } from 'react-error-boundary';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
   background:white;
  }
  body *{
    user-select : none;
  }
  ul{
    list-style: none;
    padding: 0;
    margin:0;
  }

`;

const App = () => (
  <ErrorBoundary FallbackComponent={Error}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
