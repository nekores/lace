import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiPopover-paper': {
      width: 220,
      filter: `drop-shadow(0 0px 1px ${theme.palette.surface[3]})`,
      marginTop: theme.spacing(1.5),
      padding: theme.spacing(1, 0, 2),
      '&::before': {
        content: "''",
        width: 10,
        height: 10,
        borderRadius: theme.spacing(0.25),
        background: theme.palette.surface[0],
        position: 'absolute',
        top: -4,
        right: 20,
        transform: 'rotate(45deg)',
        zIndex: -1,
      },
    },
  },
}));

const PopoverMenu = ({
  anchor,
  children,
  anchorOrigin,
  transformOrigin,
  className,
  disableCloseAsSelfClick,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuContent = () => {
    if (!disableCloseAsSelfClick) handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div
        aria-describedby={id}
        onClick={handleClick}
      >
        {anchor}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={clsx(classes.root, className)}
        anchorOrigin={anchorOrigin}
        transitionDuration={0}
        transformOrigin={transformOrigin}
      >
        <div onClick={handleClickMenuContent}>
          {children}
        </div>
      </Popover>
    </>
  );
};

PopoverMenu.propTypes = {
  anchor: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  className: PropTypes.string,
  disableCloseAsSelfClick: PropTypes.bool,
};

PopoverMenu.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  className: '',
  disableCloseAsSelfClick: false,
};

export default PopoverMenu;
