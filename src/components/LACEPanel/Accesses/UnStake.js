import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import AlertBox from '../../AlertBox';
import LaceForm from '../../LaceForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),
    height: 276,
  },
  content: {
    flex: 1,
    minHeight: 176,
  },
  footer: {
    padding: theme.spacing(0.5, 0, 3),
  },
  buttonGroup: {
    margin: theme.spacing(0, -1),
  },
  button: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  stakeInfo: {
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.surface[2],
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  loading: {
    opacity: 0.8,
    pointerEvents: 'none',
  },
  icon: {
    color: '#fff9',
    marginRight: theme.spacing(1),
  },
}));

const UnStake = ({
  onUnStake,
  data,
  handleChangeStakeValue,
  handleError,
  resetInput,
  maxUnstakeValue,
  currentTokenValue,
  inputError,
  currentLoadingProcess,
  lastSuccessAction,
  isSuccessAction,
  unstakeData,
  getPeriodInDays,
  percent,
  getPercentsForPeriod,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {isSuccessAction && (
          <AlertBox
            isActive
            variant="success"
            description=""
          />
        )}
        <LaceForm
          resetInput={resetInput}
          disabled={currentLoadingProcess !== ''}
          currency={data.tokenName}
          maxValue={maxUnstakeValue}
          setError={handleError}
          error={inputError}
          onChangeValue={handleChangeStakeValue}
          value={currentTokenValue}
        />
        {unstakeData && (
          <div className={classes.stakeInfo}>
            This staking pool has a cooldown period of
            {' '}
            {getPeriodInDays(unstakeData?.cooldownPeriod)}
            {' '}
            days. At the moment, you have the opportunity to unstake
            {' '}
            {Number(maxUnstakeValue).toFixed(2)}
            {' '}
            {data.tokenName}
            {' '}
            tokens, which is
            {' '}
            {getPercentsForPeriod() * 100 > 100 ? 100 : percent.toFixed(2)}
            % of the staked coins.
          </div>
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.buttonGroup}>
          <Button
            className={clsx(classes.button, currentLoadingProcess === 'UNSTAKING' && classes.loading)}
            variant="contained"
            fullWidth
            size="medium"
            onClick={onUnStake}
            disabled={inputError !== '' || currentTokenValue === '0'}
          >
            {currentLoadingProcess === 'UNSTAKING' ? (
              <>
                <CircularProgress className={classes.icon} size={16} />
                Unstaking...
              </>
            ) : (
              lastSuccessAction === '' ? 'Unstake' : (
                <>
                  <CheckIcon fontSize="small" className={classes.icon} />
                  Unstaked
                </>
              )
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnStake;
