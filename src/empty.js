import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Heading } from './components/Typography';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

const Empty = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Heading>Empty</Heading>
    </div>
  );
};

export default Empty;
