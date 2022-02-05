import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Container from '../../Container';
import { ReactComponent as Twitter } from '../../../assets/icons/twitter.svg';
import { ReactComponent as Medium } from '../../../assets/icons/medium.svg';
import { ReactComponent as Telegram } from '../../../assets/icons/telegram.svg';
import { ReactComponent as Discord } from '../../../assets/icons/discord.svg';
import Dot from '../../Dot';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 124,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(2.5),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sites: {
    display: 'flex',
    justifyContent: 'space-between',
    width: theme.spacing(23.75),
    marginBottom: theme.spacing(1.5),
    '& svg': {
      color: theme.palette.surface[3],
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
  links: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    fontSize: 15,
    color: theme.palette.text.secondary,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.dark,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.sites}>
          <Link to="https://twitter.com/lovelacemaas" target="_blank">
            <Twitter />
          </Link>
          <Link to="https://lovelacemaas.medium.com/" target="_blank">
            <Medium />
          </Link>
          <Link to="https://t.me/lovelaceofficial" target="_blank">
            <Telegram />
          </Link>
          <Link to="https://discord.com/invite/6w49dSAd5M" target="_blank">
            <Discord />
          </Link>
        </div>

        <div className={classes.links}>
          <Link to="/" className={classes.link}>lovelace.world</Link>
          <Dot />
          <Link to="/" className={classes.link}>contact@lovelace.world</Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
