import { observable, action, makeObservable } from 'mobx';
import Web3 from 'web3';
import * as AuthHelper from '../helpers/auth';

const LOCAL_STORAGE_KEYS = 'logged_in';

class AuthStore {
  @observable connected = false;

  @observable isLoggedInUser = !!localStorage.getItem(LOCAL_STORAGE_KEYS);

  @observable network = null;

  @observable accountChanged = [];

  @observable account = '';

  @observable chainId = 0;

  @observable metamaskEnabled = false;

  @observable ethEnabled = false;

  constructor() {
    makeObservable(this);
    if (window.ethereum) {
      this.ethEnabled = true;
      this.metamaskEnabled = window.ethereum.isMetaMask;
      window.web3 = new Web3(window.ethereum);
      this.web3GetAccounts();
      this.subscribeOnChanges();
    }
  }

  @action.bound setChainIdValue(value) {
    this.chainId = value || 0;
    this.network = AuthHelper.getNetworkByChainId(value);
  }

  web3GetAccounts() {
    window.web3.eth.getAccounts(async (err, retAccount) => {
      if (retAccount?.[0]) {
        this.accountChanged = retAccount;
        this.setAccount(retAccount[0]);

        const chainIdValue = await window.web3.eth.getChainId();
        this.setChainIdValue(chainIdValue);
      }
    });
  }

  @action.bound subscribeOnChanges() {
    window.ethereum
      .on('chainChanged', (chainId) => this.setChainIdValue(parseInt(chainId, 16)));

    window.ethereum
      .on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          this.account = accounts[0];
        } else {
          this.logout();
        }
      });
  }

  @action.bound login() {
    if (!this.metamaskEnabled) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS);
      this.isLoggedInUser = false;
    }

    window.web3.currentProvider.sendAsync(
      { method: 'eth_requestAccounts' },
      async (error, res) => {
        // if (error) {
        //   reject(error);
        // }
        //
        // if (res.error) {
        //   reject(error);
        // }

        if (res?.result?.[0]) {
          // eslint-disable-next-line prefer-destructuring
          this.account = res.result[0];

          const chainId = await window.web3.eth.getChainId();
          this.setChainIdValue(chainId);

          localStorage.setItem(LOCAL_STORAGE_KEYS, 'true');

          this.isLoggedInUser = true;

          // resolve(res.result[0]);
        }
      },
    );
  }

  @action.bound logout() {
    this.account = '';
    localStorage.removeItem(LOCAL_STORAGE_KEYS);
    this.isLoggedInUser = false;
    this.accountChanged = [];
  }

  @action.bound setAccount(account) {
    this.account = account;
  }
}

export default () => new AuthStore();
