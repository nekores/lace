import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const spacing = 8;

const typographyOptions = {
  header: {
    fontSize: 30,
    letterSpacing: 1.4,
    fontWeight: 700,
    lineHeight: '38px', //
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.5,
    lineHeight: '30px', //
  },
  subtitle: {
    fontSize: 18,
    letterSpacing: 1.3,
    fontWeight: 700, //
  },
  body: {
    fontSize: 16,
    letterSpacing: 0.6,
  },
  tinyBold: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 1,
  },
  tiny: {
    fontSize: 13,
    letterSpacing: 0.5,
    lineHeight: '12px',
  },
  caption: {
    fontSize: 14,
    letterSpacing: 0.4, //
  },
};

const theme = {
  palette: {
    type: 'dark',
    surface: colors.surface,
    background: {
      default: colors.surface[0],
      paper: colors.surface[1],
    },
    divider: colors.divider,
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
      hint: colors.text.passive,
    },
    action: {
      hover: colors.active,
      disabled: colors.depth,
    },
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
  },
  spacing,
  shape: {
    borderRadius: 10,
    mdBorderRadius: 14,
    cardBorderRadius: 18,
    lgBorderRadius: 30,
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: [
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ].join(),
    h1: typographyOptions.header,
    h2: typographyOptions.title,
    subtitle1: typographyOptions.subtitle,
    caption: typographyOptions.caption,
    body1: typographyOptions.body,
    h5: typographyOptions.tinyBold,
    h6: typographyOptions.tiny,
    button: typographyOptions.body,
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: 14,
        height: 40,
        padding: '6px 20px',
        textTransform: 'initial',
        borderRadius: 8,
        fontWeight: 500,
      },
      contained: {
        boxShadow: 'none',
      },
      sizeSmall: {
        height: 37,
        fontSize: 13,
        padding: 5,
        letterSpacing: 1.4,
      },
      sizeLarge: {
        height: 49,
        letterSpacing: 1.2,
        fontSize: 13,
      },
    },
    MuiDialog: {
      container: {
        background: 'rgba(39,43,53,0.18)',
      },
      paper: {
        margin: 16,
        borderRadius: 16,
        width: '100%',
        maxWidth: '420px !important',
        padding: 0,
        backgroundColor: colors.surface[0],
      },
    },
    MuiPopover: {
      paper: {
        overflow: 'visible !important',
        backgroundColor: colors.surface[0],
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '24px 24px',
      },
    },
  },
  props: {},
  layouts: {
    container: 1152,
    containerSm: 766,
  },
};

export default createMuiTheme(theme);
