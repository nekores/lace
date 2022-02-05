import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Title, Tiny } from '../../Typography';
import * as Utils from '../../../utils';

const useStyles = makeStyles((theme) => ({
  connect: {
    padding: theme.spacing(3, 0),
  },
  row: {
    display: 'flex',
    padding: theme.spacing(2.5, 0),
  },
  button: {
    width: theme.spacing(15),
  },
  info: {
    flex: 1,
  },
  description: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
  collectBtn: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  unStakeBtn: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const Initial = ({
  loggedIn,
  onChangeAction,
  onConnect,
  currentData,
  data,
}) => {
  const classes = useStyles();

  const isDisableStake = (cap, total) => {
    if (!cap || !total) {
      return false;
    }

    const capBn = Utils.toBN(cap).minus(1);
    const totalBn = Utils.toBN(total);

    return capBn.lt(totalBn) || capBn.eq(totalBn);
  };

  return !loggedIn ? (
    <div className={classes.connect}>
      <Button
        onClick={onConnect}
        color="primary"
        variant="contained"
        fullWidth
      >
        Connect wallet
      </Button>
    </div>
  ) : (
    currentData && (
      <>
        <div className={classes.row}>
          <div className={classes.info}>
            <Title color="textPrimary">
              {currentData.balance.toFixed(2)}
            </Title>
            <Tiny className={classes.description}>
              {`${data.tokenName} Balance`}
            </Tiny>
          </div>
          <div className={classes.button}>
            {currentData.canStake && (
              <Button
                fullWidth
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => onChangeAction('stake')}
                disabled={
                  currentData.balance === '0'
                  || isDisableStake(currentData?.stakingCap, currentData?.totalStaked)
                }
              >
                Stake
              </Button>
            )}
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.info}>
            <Title color="textPrimary">
              {currentData.staked.toFixed(2)}
            </Title>
            <Tiny className={classes.description}>
              {`${data.tokenName} Staked`}
            </Tiny>
          </div>
          <div className={classes.button}>
            {currentData.canWithdraw && (
              <Button
                className={classes.unStakeBtn}
                fullWidth
                size="medium"
                variant="contained"
                onClick={() => onChangeAction('unstake')}
                disabled={currentData.staked === '0'}
              >
                Unstake
              </Button>
            )}
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.info}>
            <Title color="textPrimary">
              {currentData.earned.toFixed(2)}
            </Title>
            <Tiny className={classes.description}>
              {data.limit ? 'Your reward' : 'LACE Earned'}
            </Tiny>
          </div>
          <div className={classes.button}>
            {!data.limit && (
              <Button
                className={classes.collectBtn}
                fullWidth
                size="medium"
                variant="contained"
                onClick={() => onChangeAction('collect')}
                disabled={currentData.earned === '0'}
              >
                Collect
              </Button>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default Initial;
