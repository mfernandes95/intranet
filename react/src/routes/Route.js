import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// import SignIn from '~/pages/SingIn';
// import DashboardEmployee from '~/pages/Dashboard/Employee';
// import Dash from '~/pages/dash';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="dashboard/admin" />;
  }

  // const Layout = signed ? DashboardEmployee : SignIn;

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
