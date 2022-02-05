import React, { useRef, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import Logo from '../../../assets/icons/logo.svg';
import MenuLink from './MenuLink';
import { Caption } from '../../Typography';
import { STORE_KEYS } from '../../../stores';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.surface[0],
    width: 288,
    display: 'flex',
    flexDirection: 'column',
    filter: 'drop-shadow(2px 4px 6px black)',
    transition: '.3s ease',
    marginLeft: -288,
    zIndex: 200,
  },
  active: {
    marginLeft: 0,
  },
  logo: {
    display: 'flex',
    padding: '12px 16px 6px',
    borderBottom: `1px solid ${theme.palette.surface[1]}`,
    marginBottom: theme.spacing(2),
    '& img': {
      width: 134,
    },
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    height: 60,
    marginRight: 0,
    paddingLeft: 30,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.surface[1],
      color: `${theme.palette.text.primary} !important`,
    },
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(3),
    '& img': {
      marginRight: theme.spacing(1),
    },
  },
  bottom: {
    padding: theme.spacing(3, 2.5),
    '& span': {
      fontSize: 13,
    },
  },
}));

const SideBar = ({
  showSidebar,
  toggleSidebar,
}) => {
  const classes = useStyles();
  const sideBarRef = useRef(null);

  const handleClickOutSide = useCallback((event) => {
    if (showSidebar && !sideBarRef.current.contains(event.target)) {
      toggleSidebar();
    }
  }, [showSidebar]);

  const clickItem = () => {
    toggleSidebar();
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutSide);

    return () => {
      window.removeEventListener('click', handleClickOutSide);
    };
  }, [handleClickOutSide]);

  return (
    <div
      ref={sideBarRef}
      className={clsx(classes.container, showSidebar && classes.active)}
    >
      <div className={classes.logo}>
        <Link to="/">
          <img
            src={Logo}
            alt="lovelace logo"
            width="100%"
            height="auto"
          />
        </Link>
      </div>
      <div className={classes.content}>
        <MenuLink
          className={classes.link}
          label="LACE Staking"
          path="/lace"
          onClick={clickItem}
        />
        <MenuLink
          className={classes.link}
          label="NFT Staking"
          path="/nft"
          onClick={clickItem}
        />
      </div>
      <div className={classes.bottom}>
        <div className={classes.info}>
          <img src="/assets/images/icons/logo.png" alt="logo" />
          <Caption>2,432.44 LACE</Caption>
        </div>
      </div>
    </div>
  );
};

export default compose(
  inject(STORE_KEYS.VIEWMODESTORE),
  observer,
  withProps(
    ({
      [STORE_KEYS.VIEWMODESTORE]: {
        showSidebar,
        toggleSidebar,
      },
    }) => ({
      showSidebar,
      toggleSidebar,
    }),
  ),
)(SideBar);
