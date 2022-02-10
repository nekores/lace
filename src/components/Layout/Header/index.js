import React from 'react';
import clsx from 'clsx';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';

import Container from '../../Container';
import MenuLink from './MenuLink';
import HeaderWidget from './HeaderWidget';
import SideBar from './SideBar';
import { STORE_KEYS } from '../../../stores';
import Logo from '../../../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(1),
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuIcon: {
    display: 'none',
    fontSize: theme.spacing(3.5),
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  header: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menus: {
    paddingLeft: theme.spacing(0.5),
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  connected: {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(6),
  },
}));

const Header = ({
  toggleSidebar,
}) => {
  const classes = useStyles();

  const handleSidebar = () => {
    toggleSidebar();
  };

  return (
    <AppBar className={classes.root} position="static" elevation={0}>
      <Container>
        <div className={classes.header}>
          <Link to="/" className={classes.logo}>
            <img
              src={Logo}
              alt="lovelace staking logo"
              width="100%"
              height="auto"
            />
          </Link>
          <div
            className={clsx(classes.menus, {
              [classes.connected]: false,
            })}
          >
            <MenuLink label="LACE Staking" path="/lace" />
            <MenuLink label="NFT Staking" path="/nft" />
            <MenuLink label="Instructions" path="/" target="_blank" />
          </div>

          <MenuIcon
            className={classes.menuIcon}
            onClick={handleSidebar}
          />

          <HeaderWidget />
        </div>
      </Container>
      <SideBar />
    </AppBar>
  );
};

export default compose(
  inject(STORE_KEYS.AUTHSTORE, STORE_KEYS.VIEWMODESTORE),
  observer,
  withProps(
    ({
      [STORE_KEYS.AUTHSTORE]: {
        isLoggedInUser,
        network,
      },
      [STORE_KEYS.VIEWMODESTORE]: {
        toggleSidebar,
      },
    }) => ({
      isLoggedInUser,
      network,
      toggleSidebar,
    }),
  ),
)(Header);
