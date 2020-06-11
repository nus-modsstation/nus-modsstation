import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const theme = responsiveFontSizes(
  createMuiTheme({
    spacing: 8,
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#421cf8',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#92e9dc',
        main: '#009688',
        // dark: will be calculated from palette.secondary.main,
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  })
);

export const materialStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    padding: theme.spacing(3),
    marginBottom: 50.0,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));
