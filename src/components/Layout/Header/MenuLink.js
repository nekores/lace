import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(3.5),
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none',
      color: `${theme.palette.primary.dark} !important`,
    },
  },
  active: {
    color: theme.palette.primary.dark,
  },
}));

const MenuLink = ({
  className,
  path,
  label,
  onClick,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Link
      className={clsx(classes.root, className)}
      to={path}
      onClick={onClick}
      {...rest}
    >
      {label}
    </Link>
  );
};

MenuLink.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MenuLink.defaultProps = {
  className: '',
  onClick: () => null,
};

export default MenuLink;
