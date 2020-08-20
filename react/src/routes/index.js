import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import SignIn from '~/pages/SingIn';
import DashboardEmployee from '~/pages/Dashboard/Employee';
import DashboardAdmin from '~/pages/Dashboard/Admin';
import DashboardCompany from '~/pages/Dashboard/Company';

import Company from '~/pages/Company';
import Project from '~/pages/Project';
import CafePalestra from '~/pages/Cafe Palestra';
import Employee from '~/pages/Employee';
import Employeer from '~/pages/Employeer';
import Companys from '~/pages/Companys';
import Position from '~/pages/Position';
import Order from '~/pages/Order';
import Product from '~/pages/Product';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route
        path="/dashboard/employee"
        component={DashboardEmployee}
        isPrivate
      />
      <Route path="/dashboard/admin" component={DashboardAdmin} isPrivate />
      <Route path="/dashboard/company" component={DashboardCompany} isPrivate />
      <Route path="/company" component={Company} isPrivate />
      <Route path="/project" component={Project} isPrivate />
      <Route path="/cafepalestra" component={CafePalestra} isPrivate />
      <Route path="/employee" component={Employee} isPrivate />
      <Route path="/employeer" component={Employeer} isPrivate />
      <Route path="/companys" component={Companys} isPrivate />
      <Route path="/position" component={Position} isPrivate />
      <Route path="/order" component={Order} isPrivate />
      <Route path="/product" component={Product} isPrivate />
    </Switch>
  );
}
