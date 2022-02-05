import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    display: 'flex',
    margin: theme.spacing(0, -1),
  },
  button: {
    padding: theme.spacing(0, 1),
    width: '50%',
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

const Stake = ({
  data,
  onApprove,
  onStake,
  handleChangeStakeValue,
  handleError,
  resetInput,
  maxStakeValue,
  currentTokenValue,
  inputError,
  currentLoadingProcess,
  lastSuccessAction,
  isIncreaseNeeded,
  isSuccessAction,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {isSuccessAction && (
          <AlertBox
            isActive
            variant="success"
          />
        )}
        <LaceForm
          resetInput={resetInput}
          disabled={currentLoadingProcess !== ''}
          currency={data.tokenName}
          maxValue={maxStakeValue}
          setError={handleError}
          error={inputError}
          onChangeValue={handleChangeStakeValue}
          value={currentTokenValue}
        />
        {data?.stakeText && (
          <div className={classes.stakeInfo}>
            See
            {' '}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://www.lovelace.world/blog" target="_blank">Blog</a>
            {' '}
            for details.
          </div>
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.buttonGroup}>
          <div className={classes.button}>
            <Button
              className={clsx(currentLoadingProcess === 'INCREASING' && classes.loading)}
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              disabled={
                inputError !== ''
                || isIncreaseNeeded
                || currentLoadingProcess === 'STAKING'
              }
              onClick={onApprove}
            >
              {currentLoadingProcess === 'INCREASING' ? (
                <>
                  <CircularProgress className={classes.icon} size={16} />
                  Approving...
                </>
              ) : (
                lastSuccessAction === 'INCREASE' ? (
                  <>
                    <CheckIcon fontSize="small" className={classes.icon} />
                    Approved
                  </>
                ) : 'Approve'
              )}
            </Button>
          </div>
          <div className={classes.button}>
            <Button
              className={clsx(currentLoadingProcess === 'STAKING' && classes.loading)}
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              disabled={
                inputError !== ''
                || isIncreaseNeeded
                || currentLoadingProcess === 'INCREASING'
                || currentTokenValue === '0'
                || currentTokenValue === ''
              }
              onClick={onStake}
            >
              {currentLoadingProcess === 'STAKING' ? (
                <>
                  <CircularProgress />
                  Staking...
                </>
              ) : 'Stake'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
