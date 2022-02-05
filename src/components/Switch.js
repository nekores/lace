import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Body } from './Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(5),
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.surface[1],
    width: theme.spacing(23.5),
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  label: {
    width: '50%',
    textAlign: 'center',
    color: theme.palette.text.disabled,
    fontSize: 15,
    zIndex: 10,
    cursor: 'pointer',
  },
  highlight: {
    color: theme.palette.text.primary,
  },
  active: {
    width: '50%',
    position: 'absolute',
    zIndex: 5,
    transition: '.2s ease',
    height: '100%',
    borderRadius: theme.spacing(3),
    top: 0,
    left: (props) => (props.active === 'active' ? 0 : '50%'),
    backgroundColor: theme.palette.surface[2],
  },
}));

const Switch = ({
  active,
  onChangeSwitch,
}) => {
  const classes = useStyles({ active });

  const handleChange = (key) => {
    onChangeSwitch(key);
  };

  return (
    <div className={classes.root}>
      <Body
        className={clsx(classes.label, {
          [classes.highlight]: active === 'active',
        })}
        onClick={() => handleChange('active')}
      >
        Live
      </Body>
      <Body
        className={clsx(classes.label, {
          [classes.highlight]: active === 'finished',
        })}
        onClick={() => handleChange('finished')}
      >
        Finished
      </Body>
      <div className={classes.active} />
    </div>
  );
};

Switch.propTypes = {
  active: PropTypes.oneOf(['active', 'finished']),
  onChangeSwitch: PropTypes.func,
};

Switch.defaultProps = {
  active: 'active',
  onChangeSwitch: () => null,
};

export default Switch;
