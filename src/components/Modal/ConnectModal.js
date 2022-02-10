import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import ConnectItem from '../ConnectItem';
import { Body } from '../Typography';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  title: {
    '& h2': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 18,
      letterSpacing: 1.3,
      fontWeight: 700,
    },
  },
  description: {
    fontSize: 14,
  },
  content: {
    padding: theme.spacing(0, 3),
    marginTop: theme.spacing(-1),
  },
  items: {
    padding: '16px 0',
  },
  close: {
    fontSize: theme.spacing(2),
    color: theme.palette.surface[4],
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const ConnectItems = [
  {
    icon: 'metamask.svg',
    label: 'Metamask',
  },
];

const ConnectModal = ({
  isOpen,
  handleClose,
  onConnect,
}) => {
  const classes = useStyles();

  const handleConnect = () => {
    onConnect();
    handleClose();
  };

  return (
    <Dialog
      className={classes.root}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle className={classes.title}>
        Connect Wallet
        <CloseIcon
          className={classes.close}
          onClick={handleClose}
        />
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Body className={classes.description} color="textSecondary">
          Connect with one of available wallet providers or create a new wallet.
        </Body>

        <div className={classes.items}>
          {ConnectItems.map((item) => (
            <ConnectItem
              key={item.icon}
              item={item}
              onClickItem={handleConnect}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

ConnectModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  onConnect: PropTypes.func,
};

ConnectModal.defaultProps = {
  isOpen: false,
  onConnect: () => null,
  handleClose: () => null,
};

export default ConnectModal;
