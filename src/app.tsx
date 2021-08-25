import React from 'react';
import { Route, Switch } from 'react-router';
import { App as TodoApp } from '@pages/App';
import { hot } from 'react-hot-loader';
import Antd from '@pages/Antd';

declare const VERSION: string;
declare const COMMITHASH: string;
declare const BRANCH: string;
declare const LASTCOMMITDATETIME: string;

const MetaVersion = () => (
  <ul>
    <li>
      VERSION:
      {VERSION}
    </li>
    <li>
      COMMITHASH:
      {COMMITHASH}
    </li>
    <li>
      BRANCH:
      {BRANCH}
    </li>
    <li>
      LASTCOMMITDATETIME:
      {LASTCOMMITDATETIME}
    </li>
  </ul>
);
export const App = hot(module)(() => (
  <Switch>
    <Route path="/todoApp" component={TodoApp} />
    <Route path="/antd" component={Antd} />
    <Route path="/_version" component={MetaVersion} />
  </Switch>
));
