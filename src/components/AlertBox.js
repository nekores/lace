import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1.25),
    padding: theme.spacing(0.25, 2),
    '& .MuiAlert-icon': {
      marginRight: theme.spacing(0.75),
    },
    fontSize: '14px !important',
    lineHeight: '15px',
    letterSpacing: 0.5,
    '& a': {
      textDecoration: 'underline',
      color: 'inherit',
    },
    cursor: 'pointer',
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
  },
  success: {
    backgroundColor: `${theme.palette.success.main}20`,
    color: theme.palette.success.main,
  },
  error: {
    backgroundColor: `${theme.palette.error.main}20`,
    color: theme.palette.error.main,
  },
}));

const AlertBox = ({
  isActive,
  description,
  variant,
}) => {
  const classes = useStyles();

  return (
    <Collapse in={isActive}>
      <Alert
        className={clsx(classes.root, classes[variant])}
        severity={variant}
      >
        <AlertTitle className={classes.title}>
          {variant === 'success' ? 'Success' : 'Error text!'}
        </AlertTitle>
        {description}
      </Alert>
    </Collapse>
  );
};

AlertBox.propTypes = {
  isActive: PropTypes.bool,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  variant: PropTypes.oneOf(['success', 'error']),
};

AlertBox.defaultProps = {
  isActive: false,
  description: '',
  variant: 'success',
};

export default AlertBox;
