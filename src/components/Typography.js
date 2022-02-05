import React, { forwardRef } from 'react';
import { Typography } from '@material-ui/core';

export const Heading = forwardRef((props, ref) => <Typography innerRef={ref} variant="h1" {...props} />);

export const Title = forwardRef((props, ref) => <Typography innerRef={ref} variant="h2" {...props} />);

export const Subtitle = forwardRef((props, ref) => <Typography innerRef={ref} variant="subtitle1" {...props} />);

export const Caption = forwardRef((props, ref) => <Typography innerRef={ref} variant="caption" {...props} />);

export const Body = forwardRef((props, ref) => <Typography innerRef={ref} variant="body1" {...props} />);

export const TinyBold = forwardRef((props, ref) => <Typography innerRef={ref} variant="h5" {...props} />);

export const Tiny = forwardRef((props, ref) => <Typography innerRef={ref} variant="h6" {...props} />);
