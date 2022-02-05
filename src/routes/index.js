import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';
import NFTStaking from '../containers/nft-staking';
import LACEStaking from '../containers/lace-staking';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => (<Redirect to="/lace" />)} />

    <PrivateRoute
      path="/nft"
      component={NFTStaking}
      layout={Layout}
    />

    <PrivateRoute
      path="/lace"
      component={LACEStaking}
      layout={Layout}
    />
  </Switch>
);

export default Routes;
