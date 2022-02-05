import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dot from './Dot';
import { Tiny } from './Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    width: '100%',
    backgroundColor: theme.palette.surface[2],
  },
  border: {
    width: '100%',
    height: 2,
  },
  wrapper: {
    height: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    paddingLeft: theme.spacing(3),
    animationPlayState: 'paused',
  },
  animation: {
    animationPlayState: 'running',
    animationName: '$flow',
    animationDuration: '10s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    '& h6': {
      whiteSpace: 'nowrap',
    },
  },
  '@keyframes flow': {
    from: {
      marginLeft: '90%',
    },
    to: {
      marginLeft: '-120%',
    },
  },
}));

const InfoBelt = ({
  duration,
  visibleData,
  currentApy,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.wrapper, classes.animation)}
        style={{ animationDuration: `${duration}s` }}
      >
        {visibleData && (
          <>
            <div className={classes.item}>
              <Tiny color="textSecondary">APY:</Tiny>
              &nbsp;
              <Tiny color="textSecondary">{currentApy}</Tiny>
            </div>

            <Dot />

            <div className={classes.item}>
              <Tiny color="textSecondary">Total Staked:</Tiny>
              &nbsp;
              <Tiny color="textSecondary">{visibleData.totalStaked}</Tiny>
            </div>

            <Dot />

            {visibleData.stakeStartDate && (
              <>
                <div className={classes.item}>
                  <Tiny color="textSecondary">Beginning:</Tiny>
                  &nbsp;
                  <Tiny color="textSecondary">{visibleData.stakeStartDate}</Tiny>
                </div>
                <Dot />
              </>
            )}

            {visibleData.stakeEndDate && (
              <>
                <div className={classes.item}>
                  <Tiny color="textSecondary">Ending:</Tiny>
                  &nbsp;
                  <Tiny color="textSecondary">{visibleData.stakeEndDate}</Tiny>
                </div>

                <Dot />
              </>
            )}

            {visibleData.stakingCap && (
              <>
                <div className={classes.item}>
                  <Tiny color="textSecondary">Pool Size:</Tiny>
                  &nbsp;
                  <Tiny color="textSecondary">{visibleData.stakingCap}</Tiny>
                </div>

                <Dot />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

InfoBelt.propTypes = {
  duration: PropTypes.number,
};

InfoBelt.defaultProps = {
  duration: 10,
};

export default InfoBelt;
