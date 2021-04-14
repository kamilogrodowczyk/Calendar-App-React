import { darken, lighten } from 'polished';

export const theme = {
  colors: {
    white: '#ffffff',
    lightGrey: '#d1d1d1',
    yellow: '#fdd425',
    darkenYellow: darken(0.1, '#fdd425'),
    black: '#222222',
    lightenBlack: lighten(0.15, '#222222'),
  },

  fontSizes: {
    small: '.7rem',
    primary: '1rem',
    medium: '1.2rem',
    large: '1.4rem',
  },
};
