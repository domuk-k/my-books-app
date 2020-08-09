import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import { ErrorBoundary } from 'react-error-boundary';
import { createGlobalStyle } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './index';
import Add from './pages/Add';
import useWindowWidth from './hooks/useWindowWidth';

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

const App = () => {
  useWindowWidth();
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <GlobalStyle />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
};

export default App;
