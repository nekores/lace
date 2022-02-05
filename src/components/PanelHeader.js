import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import AvatarIcon from './AvatarIcon';
import Tag from './Tag';
import { Title, Tiny } from './Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(0.75),
    [theme.breakpoints.up('md')]: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: '95%',
    },
  },
  description: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '18px',
  },
  iconButton: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0.5),
    '& svg': {
      fontSize: theme.spacing(2.5),
    },
    '&:hover': {
      backgroundColor: theme.palette.surface[2],
    },
  },
  back: {
    overflow: 'hidden',
    transition: 'width .3s ease',
    width: 0,
  },
  isShowBackIcon: {
    width: theme.spacing(4.5),
    marginRight: theme.spacing(1.75),
    flexShrink: 0,
  },
}));

const PanelHeader = ({
  avatar,
  title,
  description,
  status,
  isBackwards,
  onBack,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={clsx(classes.back, {
        [classes.isShowBackIcon]: Boolean(isBackwards),
      })}
      >
        <IconButton
          className={classes.iconButton}
          onClick={onBack}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <AvatarIcon avatar={avatar} />
      <div className={classes.content}>
        <Title className={classes.title}>
          {title}
        </Title>
        <Tiny className={classes.description} color="textSecondary">
          {description}
        </Tiny>
      </div>
      <Tag status={status} />
    </div>
  );
};

PanelHeader.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  status: PropTypes.string,
  isBackwards: PropTypes.bool,
  onBack: PropTypes.func,
};

PanelHeader.defaultProps = {
  title: '',
  description: '',
  status: '',
  isBackwards: false,
  onBack: () => null,
};

export default PanelHeader;
