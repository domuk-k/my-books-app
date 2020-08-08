import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import { ErrorBoundary } from 'react-error-boundary';
import { createGlobalStyle } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/create';

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

const App = store => (
  <ErrorBoundary FallbackComponent={Error}>
    <GlobalStyle />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </ErrorBoundary>
);

export default App;
