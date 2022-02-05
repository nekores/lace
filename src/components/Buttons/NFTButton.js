import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Caption } from '../Typography';
import { Icons } from '../../constants/icons';
import { CurrentAddress } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.surface[2],
    width: theme.spacing(21.5),
    height: theme.spacing(5),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0, 2),
    '& img': {
      marginRight: theme.spacing(1),
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  arrow: {
    fontSize: theme.spacing(2.75),
    marginLeft: theme.spacing(1),
  },
  icon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
}));

const NFTButton = ({ currentNetwork, currentAddress }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.icon}
        src={Icons[currentNetwork ? currentNetwork.icon : 'lace']}
        alt="lace-icon"
      />
      <Caption>{CurrentAddress(currentAddress || '', 4, 3)}</Caption>
      <KeyboardArrowDownIcon className={classes.arrow} />
    </div>
  );
};

export default NFTButton;
