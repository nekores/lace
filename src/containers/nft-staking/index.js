import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { Heading } from '../../components/Typography';

import BackgroundImage from '../../assets/coming-soon.svg';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  headerTitle: {
    marginBottom: theme.spacing(1.25),
    [theme.breakpoints.down('sm')]: {
      fontSize: `${theme.spacing(3)}px !important`,
      textAlign: 'left',
      marginBottom: theme.spacing(0.5),
    },
  },
  content: {
    paddingTop: theme.spacing(4.25),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const NFTStaking = () => {
  const classes = useStyles();

  return (
    <Fade in>
      <div className={classes.root}>
        <Heading className={classes.headerTitle} color="textPrimary" align="center">
          NFT Staking
        </Heading>

        <div className={classes.content}>
          <img src={BackgroundImage} alt="coming-soon" />
        </div>
      </div>
    </Fade>
  );
};

export default NFTStaking;
