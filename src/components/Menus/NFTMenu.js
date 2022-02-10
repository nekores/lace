/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import NFTButton from '../Buttons/NFTButton';
import PopoverMenu from '../PopoverMenu';
import { Tiny } from '../Typography';
import { Icons } from '../../constants/icons';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.175, 1.875),
    '& img': {
      marginRight: theme.spacing(1),
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.surface[2],
    },
  },
  buttonWrapper: {
    padding: theme.spacing(0.75, 2, 0),
  },
  button: {
    color: '#fff',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  icon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
}));

const NFTMenu = ({
  menuList,
  onSelectNetwork,
  onSwitchNetwork,
  onDisconnect,
  currentNetwork,
  currentAddress,
}) => {
  const classes = useStyles();

  return (
    <PopoverMenu
      className={classes.root}
      anchor={<NFTButton currentAddress={currentAddress} currentNetwork={currentNetwork} />}
    >
      <>
        {/* {menuList.map((menu) => (
          <div
            key={menu.type}
            className={classes.item}
            onClick={() => onSelectNetwork(menu)}
          >
            <img className={classes.icon} src={Icons[menu.icon]} alt={menu.icon} />
            <Tiny>{`Switch to ${menu.name.length > 4 ? menu.name.toUpperCase() : menu.name}`}</Tiny>
          </div>
        ))} */}

        {Boolean(menuList.length) && <Divider />}

        {/* <div
          className={classes.item}
          onClick={onSwitchNetwork}
        >
          <img src={Icons.swap} alt="swap" />
          <Tiny>Change Wallet Provider</Tiny>
        </div> */}
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.button}
            fullWidth
            color="secondary"
            onClick={onDisconnect}
          >
            Disconnect
          </Button>
        </div>
      </>
    </PopoverMenu>
  );
};

export default NFTMenu;
