import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import TokenInfo from '../TokenBelt';
import Container from '../Container';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing(14),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3.75),
    },
  },
  top: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.surface[1],
    zIndex: 100,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Header />
        {location.pathname === '/lace' && (
          <TokenInfo />
        )}
      </div>
      <Container variant="sm" className={classes.content}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
