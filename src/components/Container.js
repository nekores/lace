import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '100%',
    height: '100%',
    padding: theme.spacing(0, 2),
  },
  md: {
    maxWidth: 1042,
  },
  sm: {
    maxWidth: 944,
  },
}));

const Container = ({
  children,
  className,
  variant,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, classes[variant], className)}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['md', 'sm']),
};

Container.defaultProps = {
  className: '',
  variant: 'md',
};

export default Container;
