import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    borderRadius: theme.spacing(1),
    background: theme.palette.surface[2],
    '& .MuiSvgIcon-root': {
      fontSize: theme.spacing(4),
    },
  },
  primary: {
    backgroundColor: `${theme.palette.primary.main}70`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  info: {
    backgroundColor: `${theme.palette.info.main}70`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.info.main,
    },
  },
  secondary: {
    backgroundColor: `${theme.palette.secondary.main}70`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.secondary.main,
    },
  },
  success: {
    backgroundColor: `${theme.palette.success.main}70`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.success.main,
    },
  },
}));

const variants = ['success', 'primary', 'info', 'secondary'];

const AvatarIcon = ({
  avatar,
  className,
}) => {
  const classes = useStyles();
  const variant = useMemo(() => {
    const random = Math.floor(Math.random() * 4);
    return variants[random];
  }, []);

  return (
    <Avatar
      src={avatar}
      className={clsx(classes.root, className, classes[variant])}
    />
  );
};

AvatarIcon.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

AvatarIcon.defaultProps = {
  className: '',
};

export default AvatarIcon;
