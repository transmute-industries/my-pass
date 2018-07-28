// https://material.io/color/#!/?view.left=0&view.right=0&secondary.color=651FFF&primary.color=006064

import { createMuiTheme } from 'material-ui/styles';
import {
  blue,
  red,
  // colors,
  green
} from 'material-ui/colors';
import spacing from 'material-ui/styles/spacing';

// import { fade } from 'material-ui/styles/utils/colorManipulator';

export default createMuiTheme({
  spacing: spacing,
  typography: {
    fontFamily: 'Lato',
  },
  palette: {
    primary: {
      light: blue['700'],
      main: blue['700'],
      dark: blue['900'],
      contrastText: '#fff'
    },
    secondary: {
      light: green['200'],
      main: green['400'],
      dark: green['700'],
      contrastText: '#fff'
    },
    error: red
  }
});
