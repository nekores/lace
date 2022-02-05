import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import MetamaskIcon from '../assets/icons/metamask.svg';
import { Body } from './Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.surface[2]}`,
    borderRadius: theme.spacing(1),
    background: 'transparent',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.surface[2],
    },
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.175, 1.5),
    '& img': {
      marginRight: theme.spacing(2),
    },
  },
}));

const ConnectItem = ({
  item,
  onClickItem,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      onClick={onClickItem}
    >
      <img src={MetamaskIcon} alt="item-icon" />
      <Body>{item?.label}</Body>
    </div>
  );
};

ConnectItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClickItem: PropTypes.func,
};

ConnectItem.defaultProps = {
  onClickItem: () => null,
};

export default ConnectItem;
