/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import NFTMenu from '../../Menus/NFTMenu';
import ConnectModal from '../../Modal/ConnectModal';
import { STORE_KEYS } from '../../../stores';
import { BLOCKCHAIN_WORKSPACES, ChainsConfig, NETWORKS_CHAINS } from '../../../constants/variables';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(3),
    '& img': {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  connect: {
    width: 144,
  },
}));

const HeaderWidget = ({
  isLoggedInUser,
  network,
  accountChanged,
  account,
  logout,
  chainId,
  login,
}) => {
  const classes = useStyles();

  const [isShowConnectModal, setIsShowConnectModal] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState(null);

  const isConnected = useMemo(() => {
    const isWrongNetwork = !network || network !== BLOCKCHAIN_WORKSPACES.BINANCE;
    return isLoggedInUser || !isWrongNetwork;
  }, [network, isLoggedInUser]);

  const networkList = useMemo(() => {
    const list = Object.values(ChainsConfig).filter((item) => item.type !== currentNetwork?.type);
    return list;
  }, [currentNetwork]);

  useEffect(() => {
    switch (chainId) {
      case NETWORKS_CHAINS.ETHER_CHAIN_ID:
        setCurrentNetwork(ChainsConfig[BLOCKCHAIN_WORKSPACES.ETHEREUM]);
        break;
      case NETWORKS_CHAINS.ETHER_TEST_CHAIN_ID:
        setCurrentNetwork(ChainsConfig[BLOCKCHAIN_WORKSPACES.ETHEREUM]);
        break;
      case NETWORKS_CHAINS.MATIC_CHAIN_ID:
        setCurrentNetwork(ChainsConfig[BLOCKCHAIN_WORKSPACES.MATIC]);
        break;
      case NETWORKS_CHAINS.MATIC_TEST_CHAIN_ID:
        setCurrentNetwork(ChainsConfig[BLOCKCHAIN_WORKSPACES.MATIC]);
        break;
      case NETWORKS_CHAINS.BSC_CHAIN_ID:
        setCurrentNetwork(ChainsConfig[BLOCKCHAIN_WORKSPACES.BINANCE]);
        break;
      case NETWORKS_CHAINS.BSC_TEST_CHAIN_ID:
        setCurrentNetwork(ChainsConfig[BLOCKCHAIN_WORKSPACES.BINANCE]);
        break;
      default:
        setCurrentNetwork(null);
    }
  }, [chainId]);

  // eslint-disable-next-line no-unused-vars
  const selectNetwork = (option) => {
    // if (!option.type) {
    //
    // }
  };

  return (
    <div className={classes.root}>
      {isLoggedInUser ? (
        <NFTMenu
          currentNetwork={currentNetwork}
          currentAddress={account || ''}
          menuList={networkList}
          onSelectNetwork={selectNetwork}
          onSwitchNetwork={() => setIsShowConnectModal(true)}
          onDisconnect={logout}
        />
      ) : (
        <Button
          color="primary"
          variant="contained"
          size="medium"
          onClick={() => setIsShowConnectModal(true)}
        >
          Connect Wallet
        </Button>
      )}

      <ConnectModal
        isOpen={isShowConnectModal}
        handleClose={() => setIsShowConnectModal(false)}
        onConnect={login}
      />
    </div>
  );
};

export default compose(
  inject(STORE_KEYS.AUTHSTORE),
  observer,
  withProps(
    ({
      [STORE_KEYS.AUTHSTORE]: {
        isLoggedInUser,
        network,
        accountChanged,
        account,
        logout,
        chainId,
        login,
      },
    }) => ({
      isLoggedInUser,
      network,
      accountChanged,
      account,
      logout,
      chainId,
      login,
    }),
  ),
)(HeaderWidget);
