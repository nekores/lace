import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: theme.palette.surface[3],
    display: 'inline-block',
    margin: theme.spacing(0, 1.875),
  },
}));

const Dot = () => {
  const classes = useStyles();

  return (
    <span className={classes.root} />
  );
};

export default Dot;
