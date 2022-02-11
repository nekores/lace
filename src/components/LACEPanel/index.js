import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import { compose, withProps } from 'recompose';
import { inject, observer } from 'mobx-react';
import Web3 from 'web3';
import { NETWORKS_CHAINS } from 'constants/variables';
import PanelHeader from '../PanelHeader';
import InfoBelt from '../InfoBelt';
import Initial from './Accesses/Initial';
import Stake from './Accesses/Stake';
import UnStake from './Accesses/UnStake';
import Collect from './Accesses/Collect';
import * as StakingHelper from '../../helpers/staking';
import * as Utils from '../../utils';
import { STORE_KEYS } from '../../stores';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  content: {
    padding: theme.spacing(0, 3),
  },
}));

const LACEPanel = ({
  className,
  data,
  status,
  onConnect,
  isLoggedInUser,
  ethEnabled,
  account,
  chainId,
}) => {
  const classes = useStyles();

  // const currentTokenType = data.type;
  const currentAddress = account || '';
  const loggedIn = isLoggedInUser && ethEnabled && account;

  const [currentAction, setCurrentAction] = useState(''); // '', 'stake', 'unstake', 'collect',
  const [currentData, setCurrentData] = useState(null);
  const [currentTokenValue, setCurrentTokenValue] = useState('0');
  const [currentAllowance, setCurrentAllowance] = useState('');
  const [isIncreaseNeeded, setIsIncreaseNeeded] = useState(false);
  const [inputError, setInputError] = useState('');
  const [lastSuccessAction, setLastSuccessAction] = useState(false);
  const [isSuccessAction, setIsSuccessAction] = useState(false);
  const [resetInput, setResetInput] = useState(false);
  const [currentLoadingProcess, setCurrentLoadingProgress] = useState('');
  const [unstakeData, setUnstakeData] = useState(null);
  const [maxUnstakeVal, setMaxUnstakeVal] = useState('');
  const [percent, setPercent] = useState(0);

  const getDifferentBetweenLastUpdateAndCurrentTime = () => {
    if (!unstakeData?.userInfo?.lastUpdate) {
      return 0;
    }

    // TODO get UTC time
    return new Date().getTime() - (+unstakeData.userInfo.lastUpdate * 1000);
  };

  const checkIsFullyUnlockedUnstake = () => {
    if (!unstakeData?.userInfo?.lastUpdate || !unstakeData.cooldownPeriod) {
      return false;
    }

    return getDifferentBetweenLastUpdateAndCurrentTime() > unstakeData.cooldownPeriod;
  };

  const getPeriodInDays = (periodInMs) => {
    if (!periodInMs) {
      return 0;
    }

    const msInOneDay = 86400000;
    const days = periodInMs / msInOneDay;

    return days > 0 ? days : 0;
  };

  const getPercentsForPeriod = () => {
    const percentsPerDay = (100 / getPeriodInDays(unstakeData?.cooldownPeriod)) / 100;

    return getPeriodInDays(getDifferentBetweenLastUpdateAndCurrentTime()) * percentsPerDay;
  };

  const calculateMaxUnstakeValue = () => {
    const valInWei = Web3.utils.fromWei(
      Web3.utils.toBN(unstakeData.userInfo.locked)
        .muln(getPercentsForPeriod()),
    );

    return valInWei;
  };

  const getMaxUnstakeVal = () => {
    if (!unstakeData) {
      return '0';
    }

    return checkIsFullyUnlockedUnstake()
      ? Utils.convertFrom(unstakeData.userInfo.locked)
      : calculateMaxUnstakeValue();
  };

  const getUnstakeData = async () => {
    const getCooldownPeriod = await StakingHelper.getCooldownPeriod(
      StakingHelper.getContractByAddress(data.stakingAddress),
      currentAddress,
    );
    const getUsersInfo = await StakingHelper.getUsersInfo(
      StakingHelper.getContractByAddress(data.stakingAddress),
      currentAddress,
    );

    Promise.all([getCooldownPeriod, getUsersInfo])
      .then(([cooldownPeriod, userInfo]) => {
        const { staked, locked, lastUpdate } = userInfo;
        // const staked = Number(userInfo.staked);
        // const locked = Number(userInfo.locked);
        // const lastUpdate = Number(userInfo.lastUpdate);
        const currentUTCTime = moment().utc(false).valueOf();
        const diffSinceLastUpdate = Utils.toBN(currentUTCTime).minus((+lastUpdate) * 1000);

        if (diffSinceLastUpdate.lt(cooldownPeriod)) {
          const unlockedTokens = Utils.toBN(staked).minus(locked)
            .plus(
              Utils.toBN(locked).multipliedBy(diffSinceLastUpdate).dividedBy(cooldownPeriod),
            );
          setMaxUnstakeVal(Utils.normalizeValue(unlockedTokens));
          setPercent(unlockedTokens.multipliedBy(100).dividedBy(staked).toNumber());
        } else {
          setMaxUnstakeVal(getMaxUnstakeVal());
        }

        setUnstakeData({ cooldownPeriod, userInfo });
        setCurrentAction('unstake');
      });
  };

  const getStakeValueChange = (event, action = 'stake') => {
    setCurrentTokenValue(event.toString());
    setIsIncreaseNeeded(Number(currentAllowance) < event);

    if (action !== 'stake') {
      getUnstakeData();
    }
  };

  const onChangeAction = (actionType) => {
    setCurrentAction(actionType);

    if (actionType === 'unstake') {
      getUnstakeData();
    } else {
      setUnstakeData(null);
      setMaxUnstakeVal('');
    }
  };

  const approve = async () => {
    setIsSuccessAction(false);
    setLastSuccessAction('');
    setResetInput(false);

    const increaseAloowanceResult = await StakingHelper
      .increaseAllowance(
        currentAddress,
        Utils.convertTo(currentTokenValue),
        data.stakingAddress,
        StakingHelper.getContractByAddress(data.tokenAddress),
      );
    if (increaseAloowanceResult) {
      setIsIncreaseNeeded(false);
      setCurrentAllowance(currentTokenValue);
      setLastSuccessAction('INCREASE');
    }

    setCurrentLoadingProgress('');
  };

  const defaultData = async () => {
    try {
      const newAllowance = Utils.convertFrom(await StakingHelper.getAllowance(
        currentAddress,
        data.stakingAddress,
        StakingHelper.getContractByAddress(data.tokenAddress),
      ));
      setCurrentAllowance(newAllowance);

      const newCurrentData = await StakingHelper.getDefaultData(
        StakingHelper.getContractByAddress(data.stakingAddress),
        StakingHelper.getContractByAddress(data.tokenAddress),
        currentAddress,
        data.limit,
      );
      setCurrentData(newCurrentData);
    // eslint-disable-next-line no-empty
    } catch (error) { }
  };

  const back = async () => {
    await defaultData();
    setLastSuccessAction('');
    setCurrentAction('');
    setLastSuccessAction('');
    setCurrentAction('');
    setIsSuccessAction(false);
  };

  const stake = async () => {
    setIsSuccessAction(false);
    setResetInput(false);
    const res = await StakingHelper.getAllowance(
      currentAddress,
      data.stakingAddress,
      StakingHelper.getContractByAddress(data.tokenAddress),
    );
    const newAllowance = Utils.convertFrom(res);
    setCurrentAllowance(newAllowance);
    setCurrentLoadingProgress('STAKING');

    if (!isIncreaseNeeded) {
      const stakingResult = await StakingHelper.stake(
        currentAddress,
        Utils.convertTo(currentTokenValue),
        StakingHelper.getContractByAddress(data.stakingAddress),
      );

      if (stakingResult) {
        setIsSuccessAction(true);
        setResetInput(true);
        setLastSuccessAction('STAKING');
        await back();
      }
    }

    setCurrentLoadingProgress('');
  };

  const unstake = async () => {
    setIsSuccessAction(false);
    setResetInput(false);
    setCurrentLoadingProgress('UNSTAKING');

    const stakingResult = await StakingHelper.unstake(
      currentAddress,
      Utils.convertToDecimals(currentTokenValue),
      StakingHelper.getContractByAddress(data.stakingAddress),
    );

    if (stakingResult) {
      setIsSuccessAction(true);
      setResetInput(true);
      setLastSuccessAction('UNSTAKING');
    }

    setCurrentLoadingProgress('');

    await back();
  };

  const collect = async () => {
    setCurrentLoadingProgress('COLLECTING');
    const stakingResult = await StakingHelper.collect(
      StakingHelper.getContractByAddress(data.stakingAddress),
      currentAddress,
    );

    if (stakingResult) {
      setLastSuccessAction('COLLECTING');
      const newCurrentData = await StakingHelper.getDefaultData(
        StakingHelper.getContractByAddress(data.stakingAddress),
        StakingHelper.getContractByAddress(data.tokenAddress),
        currentAddress,
        data.limit,
      );
      setCurrentData(newCurrentData);
      setIsSuccessAction(true);
    }

    setCurrentLoadingProgress('');
  };

  const getInputError = (event) => {
    setInputError(event);
  };

  useEffect(() => {
    if (currentAddress) {
      if ((chainId === NETWORKS_CHAINS.BSC_TEST_CHAIN_ID)
          || (currentAddress && chainId === NETWORKS_CHAINS.BSC_CHAIN_ID)) {
        defaultData();
      } else {
        setCurrentData(null);
      }
    } else {
      setCurrentData(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress, chainId]);

  return (
    <Paper
      className={clsx(classes.root, className)}
      elevation={0}
    >
      <PanelHeader
        avatar={data.img}
        title={data.title}
        description={data.description}
        status={status}
        isBackwards={currentAction}
        onBack={back}
      />
      <InfoBelt
        isMovable
        duration={10}
        visibleData={currentData}
      />
      <div className={classes.content}>
        {currentAction === '' && (
          <Initial
            onConnect={onConnect}
            loggedIn={loggedIn}
            currentData={currentData}
            data={data}
            onChangeAction={onChangeAction}
          />
        )}
        {currentAction === 'stake' && (
          <Stake
            data={data}
            handleChangeStakeValue={getStakeValueChange}
            handleError={getInputError}
            resetInput={resetInput}
            maxStakeValue={currentData?.balance}
            inputError={inputError}
            onApprove={approve}
            onStake={stake}
            currentTokenValue={currentTokenValue}
            currentLoadingProgress={currentLoadingProcess}
            isIncreaseNeeded={isIncreaseNeeded}
            lastSuccessAction={lastSuccessAction}
            isSuccessAction={isSuccessAction}
          />
        )}
        {currentAction === 'unstake' && (
          <UnStake
            onUnStake={unstake}
            data={data}
            handleChangeStakeValue={getStakeValueChange}
            handleError={getInputError}
            resetInput={resetInput}
            maxUnstakeValue={maxUnstakeVal}
            currentTokenValue={currentTokenValue}
            inputError={inputError}
            currentLoadingProcess={currentLoadingProcess}
            lastSuccessAction={lastSuccessAction}
            isSuccessAction={isSuccessAction}
            unstakeData={unstakeData}
            getPeriodInDays={getPeriodInDays}
            percent={percent}
            getPercentsForPeriod={getPercentsForPeriod}
          />
        )}
        {currentAction === 'collect' && (
          <Collect
            onCollect={collect}
            currentData={currentData}
            currentLoadingProcess={currentLoadingProcess}
            lastSuccessAction={lastSuccessAction}
            isSuccessAction={isSuccessAction}
          />
        )}
      </div>
    </Paper>
  );
};

export default compose(
  inject(STORE_KEYS.AUTHSTORE),
  observer,
  withProps(
    ({
      [STORE_KEYS.AUTHSTORE]: {
        isLoggedInUser,
        ethEnabled,
        account,
        accountChanged,
        chainId,
      },
    }) => ({
      isLoggedInUser,
      ethEnabled,
      account,
      accountChanged,
      chainId,
    }),
  ),
)(LACEPanel);
