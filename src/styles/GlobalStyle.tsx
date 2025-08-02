import { createGlobalStyle, css } from 'styled-components';

// This is the same file you would use in your app, to reset CSS and set up your global styles.

export const GlobalStyle = createGlobalStyle(
  ({ theme: { color } }) => css`
    body {
      background: ${color.background};
    }
  `
);
