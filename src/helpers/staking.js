import Web3 from 'web3';
import config from '../constants/config';
import {
  BLOCKCHAIN_WORKSPACES,
  ContractAddresses,
  CotractAddressesMainnet,
  CotractAddressesTestnet,
  AVERAGE_BLOCK_AMOUNT_PER_YEAR,
} from '../constants/variables';
import ERC20 from '../constants/jsons/abi/ERC20.json';
import Staking from '../constants/jsons/abi/Staking.json';
import LpStaking from '../constants/jsons/abi/LPStaking.json';
import * as Utils from '../utils';
import PremiumStaking from '../constants/jsons/abi/PremiumStaking.json';

export function getContractAddresses() {
  return config.isMainnet ? CotractAddressesMainnet : CotractAddressesTestnet;
}

export function web3() {
  window.web3 = new Web3(window[BLOCKCHAIN_WORKSPACES.ETHEREUM]);

  return window.web3;
}

export function getLaceContract() {
  if (window.web3.eth) {
    return new window.web3.eth.Contract(ERC20, ContractAddresses.laceToken);
  }

  return null;
}

export function getStakingContract() {
  if (window.web3.eth) {
    return new window.web3.eth.Contract(Staking, ContractAddresses.guaranteedApyStaking);
  }

  return null;
}

export function getLpStakingContract() {
  if (window.web3.eth) {
    return new window.web3.eth.Contract(LpStaking, ContractAddresses.lpStaking);
  }

  return null;
}

export function getLpContract() {
  if (window.web3.eth) {
    return new window.web3.eth.Contract(ERC20, ContractAddresses.lpToken);
  }

  return null;
}

export function increaseAllowance(address, value, stakingAddress, tokenContract) {
  return new Promise((resolve) => {
    tokenContract.methods.approve(stakingAddress, value).send({ from: address }, (err) => {
      if (err) {
        resolve(false);
      }
    }).then((res) => {
      resolve(res);
    });
  });
}

export function getAllowance(account, stakingAddress, tokenContract) {
  return tokenContract.methods.allowance(account, stakingAddress).call({ from: account });
}

export function stake(account, amount, stakingContract) {
  return new Promise((resolve) => {
    stakingContract.methods.stake(amount).send({ from: account }, (err) => {
      if (err) {
        resolve(false);
      }
    }).then((res) => {
      resolve(res);
    });
  });
}

export function getCooldownPeriod(contract, account) {
  return new Promise((resolve, reject) => {
    contract.methods.cooldownPeriod()
      .call({ from: account })
      .then((res) => {
        resolve((+res) * 1000);
      })
      .catch((error) => reject(error));
  });
}

export function getUsersInfo(contract, account) {
  return new Promise((resolve, reject) => {
    contract.methods.usersInfo(account)
      .call({ from: account })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => reject(error));
  });
}

export function unstake(account, amount, stakingContract) {
  return new Promise((resolve) => {
    stakingContract.methods.withdraw(amount).send({ from: account }, (err) => {
      if (err) {
        resolve(false);
      }
    }).then((res) => {
      resolve(res);
    });
  });
}

export function collect(contract, account) {
  return new Promise((resolve) => {
    contract.methods.getReward().send({ from: account }, (err) => {
      if (err) {
        resolve(false);
      }
    }).then((res) => {
      resolve(res);
    });
  });
}

export async function getDefaultData(stakingContract, tokenContract, accountAddress, isLimited = false) {
  let earned = '';
  let staked = '';
  let totalStaked = '';
  let canWithdraw = true;
  let canStake = true;
  let stakeStartDate = null;
  let stakeEndDate = null;
  let stakingCap = null;
  const balance = Utils.convertFrom(await tokenContract.methods.balanceOf(accountAddress).call());

  if (isLimited) {
    staked = Utils.convertFrom(await stakingContract.methods.stakeOf(accountAddress).call());
    earned = Utils.convertFrom(await stakingContract.methods.earned(accountAddress).call());
    totalStaked = Utils.convertFrom(await stakingContract.methods.stakedTotal().call());
    const withdrawEndDate = await stakingContract.methods.withdrawEnds().call();
    const withdrawStartDate = await stakingContract.methods.withdrawStarts().call();
    canWithdraw = Utils.isDatePass(withdrawStartDate) && !Utils.isDatePass(withdrawEndDate);
    stakeEndDate = await stakingContract.methods.stakingEnds().call();
    stakeStartDate = await stakingContract.methods.stakingStarts().call();
    stakingCap = await stakingContract.methods.stakingCap().call();
    canStake = Utils.isDatePass(stakeStartDate) && !Utils.isDatePass(stakeEndDate);
  } else {
    const userinfo = await stakingContract.methods.usersInfo(accountAddress).call();
    staked = Utils.convertFrom(userinfo.staked);
    earned = Utils.convertFrom(await stakingContract.methods.earned(accountAddress).call());
    totalStaked = Utils.convertFrom(await stakingContract.methods.totalStaked().call());
  }

  return {
    earned,
    staked,
    balance,
    totalStaked,
    canWithdraw,
    canStake,
    ...(
      isLimited
        ? {
          stakeStartDate: stakeStartDate * 1000, // convert seconds to miliseconds
          stakeEndDate: stakeEndDate * 1000, // convert seconds to miliseconds
          stakingCap: Utils.convertFrom(stakingCap),
        }
        : {}
    ),
  };
}

export function getContractByAddress(address) {
  let contract = null;
  switch (address) {
    case ContractAddresses.guaranteedApyStaking: {
      contract = new window.web3.eth.Contract(PremiumStaking, address);
      break;
    }
    case ContractAddresses.unlimitedStaking: {
      contract = new window.web3.eth.Contract(Staking, address);
      break;
    }
    case ContractAddresses.laceToken: {
      contract = new window.web3.eth.Contract(ERC20, address);
      break;
    }
    case ContractAddresses.lpToken: {
      contract = new window.web3.eth.Contract(ERC20, address);
      break;
    }
    case ContractAddresses.lpStaking: {
      contract = new window.web3.eth.Contract(LpStaking, address);
      break;
    }
    default: break;
  }
  return contract;
}

export async function getLaceApy(contract) {
  const rewardPerBlockResult = await contract.methods.rewardPerBlock().call();

  const staked = Utils.convertFrom(await contract.methods.totalStaked().call());

  const rewardPerBlock = Utils.toBN(Utils.convertFrom(rewardPerBlockResult));

  const apy = rewardPerBlock.times(AVERAGE_BLOCK_AMOUNT_PER_YEAR).times(100).div(Utils.toBN(Utils.convertFrom(staked)));

  return apy.shiftedBy(-18).dp(2).toString();
}

export async function getLimitedApy(contract) {
  const secondsInYear = Utils.toBN(60 * 60 * 24 * 30 * 12);
  const totalReward = Utils.toBN(await contract.methods.totalReward().call());
  const stakingCap = Utils.toBN(await contract.methods.stakingCap().call());
  const stakingStarts = Utils.toBN(await contract.methods.stakingStarts().call());
  const stakingEnds = Utils.toBN(await contract.methods.stakingEnds().call());

  const diff = stakingEnds.minus(stakingStarts);

  const apy = totalReward
    .times(100)
    .times((
      secondsInYear
        .div(diff)
    ))
    .div(stakingCap);

  return apy.dp(2).toString();
}

export async function getLimitedPoolReward(contract, account) {
  const currentDate = Utils.toBN(Date.now() / 1000).dp(0);
  const stakedOf = Utils.toBN(await contract.methods.stakeOf(account).call());
  const stakingStarts = Utils.toBN(await contract.methods.stakingStarts().call());
  const stakingEnds = Utils.toBN(await contract.methods.stakingEnds().call());
  const totalReward = Utils.toBN(await contract.methods.totalReward().call());
  const stakingCap = Utils.toBN(await contract.methods.stakingCap().call());

  const reward = stakedOf
    .times((
      currentDate
        .minus(stakingStarts)
    ))
    .times(totalReward)
    .div(stakingCap)
    .div((
      stakingEnds
        .minus(stakingStarts)
    ));

  return reward.shiftedBy(-18).dp(3).toString();
}

export async function getApy(contract) {
  const apy = Utils.toBN(await contract.methods.getAPY().call()).shiftedBy(-5).dp(2).toString();

  return apy;
}
