import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  layout: L, component: C, user, props: cProps, path, ...rest
}) => {
  const isAuthorized = true;

  return (
    <Route
      {...rest}
      render={(props) => (isAuthorized ? (
        <L>
          <C {...props} {...cProps} match={rest.computedMatch} />
        </L>
      ) : (
        <Redirect to="/auth/login" />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  layout: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  user: PropTypes.object,
  path: PropTypes.string,
  props: PropTypes.object,
};

PrivateRoute.defaultProps = {
  user: null,
  path: '',
  props: {},
};

export default PrivateRoute;
