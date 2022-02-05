import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Tiny } from './Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1.75),
    borderRadius: theme.spacing(0.8),
    marginTop: theme.spacing(0.5),
    height: 'fit-content',
  },
  label: {
    textTransform: 'capitalize',
  },
  active: {
    backgroundColor: theme.palette.success.transparent,
    color: theme.palette.success.main,
  },
  finished: {
    backgroundColor: theme.palette.error.transparent,
    color: theme.palette.error.main,
  },
}));

const Tag = ({ status }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, classes[status])}
    >
      <Tiny className={classes.label}>
        {status}
      </Tiny>
    </div>
  );
};

Tag.propTypes = {
  status: PropTypes.oneOf(['active', 'finished']),
};

Tag.defaultProps = {
  status: '',
};

export default Tag;
