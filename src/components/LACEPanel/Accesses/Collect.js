import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import AlertBox from '../../AlertBox';

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
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  collectValue: {
    border: `2px solid ${theme.palette.surface[2]}`,
    padding: theme.spacing(1.5),
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

const Collect = ({
  onCollect,
  currentData,
  currentLoadingProcess,
  lastSuccessAction,
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
            description=""
          />
        )}
        {
          <div className={classes.collectValue}>
            {currentData.earned.toFixed(2)}
          </div>
        }
      </div>
      <div className={classes.footer}>
        <div className={classes.buttonGroup}>
          <Button
            className={clsx(classes.button, currentLoadingProcess === 'COLLECTING' && classes.loading)}
            variant="contained"
            fullWidth
            size="medium"
            onClick={onCollect}
            disabled={isSuccessAction}
          >
            {currentLoadingProcess === 'COLLECTING' ? (
              <>
                <CircularProgress className={classes.icon} size={16} />
                Collecting...
              </>
            ) : (
              lastSuccessAction !== '' ? (
                <>
                  <CheckIcon fontSize="small" className={classes.icon} />
                  Collected
                </>
              ) : 'Collect'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Collect;
