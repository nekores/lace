import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

import { Body, Heading } from '../../components/Typography';
import LACEPanel from '../../components/LACEPanel/index';
import Switch from '../../components/Switch';
import ConnectModal from '../../components/Modal/ConnectModal';
import { StakingPools } from '../../constants/data';
import { STORE_KEYS } from '../../stores';

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
  body: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      fontSize: 14,
    },
  },
  content: {
    paddingTop: theme.spacing(4.25),
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(0, -1.5),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3.5),
    },
  },
  panel: {
    width: '50%',
    padding: theme.spacing(0, 1.5),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  switchWrapper: {
    marginTop: 23,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: 17,
      justifyContent: 'flex-start',
    },
  },
}));

const LACEStaking = ({ login }) => {
  const classes = useStyles();
  const [activeLabel, setActiveLabel] = useState('active');
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);

  const getUpdateDataAction = () => {
    // TODO: please update data action
  };

  return (
    <>
      <Fade in>
        <div className={classes.root}>
          <Heading className={classes.headerTitle} color="textPrimary" align="center">
            LACE Staking
          </Heading>
          <Body color="textSecondary" align="center" className={classes.body}>
            Just stake LACE or Liquidity Pool tokens to earn.
          </Body>
          <div className={classes.switchWrapper}>
            <Switch
              active={activeLabel}
              onChangeSwitch={setActiveLabel}
            />
          </div>
          <div className={classes.content}>
            {activeLabel === 'active' && (
              StakingPools.map((pool) => (
                <div
                  className={classes.panel}
                  key={pool.title}
                >
                  <LACEPanel
                    data={pool}
                    updateData={getUpdateDataAction}
                    status="active"
                    onConnect={() => setIsOpenConnectModal(true)}
                  />
                </div>
              ))
            )}
            {activeLabel === 'finished' && (
              <Box display="flex" justifyContent="center" width="100%">
                <Body color="textSecondary" align="center">There are no finished pools right now.</Body>
              </Box>
            )}
          </div>
        </div>
      </Fade>

      <ConnectModal
        isOpen={isOpenConnectModal}
        onConnect={login}
        handleClose={() => setIsOpenConnectModal(false)}
      />
    </>
  );
};

export default compose(
  inject(STORE_KEYS.AUTHSTORE),
  observer,
  withProps(
    ({
      [STORE_KEYS.AUTHSTORE]: {
        login,
        isLoggedInUser,
        logout,
      },
    }) => ({
      login,
      isLoggedInUser,
      logout,
    }),
  ),
)(LACEStaking);
