import React from 'react';
import { Route, Switch } from 'react-router';
import { App as TodoApp } from '@pages/App';
import { hot } from 'react-hot-loader';
import Antd from '@pages/Antd';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/todoApp" component={TodoApp} />
    <Route path="/antd" component={Antd} />
  </Switch>
));
