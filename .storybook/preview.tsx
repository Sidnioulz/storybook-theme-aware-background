import type { Preview } from '@storybook/react-vite';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../src/styles/theme';

// OPTION 1 CODE
// import { GlobalStyle } from '../src/styles/GlobalStyle';


// OPTION 2 CODE
import type { Decorator } from '@storybook/react-vite';
import styled from 'styled-components';
import React from 'react';
import { type DefaultTheme } from '../src/styles/theme';
const ThemedBackground = styled.div<{
  isCentered: boolean;
  isInDocs: boolean;
  theme: DefaultTheme;
}>(
  ({ isCentered, isInDocs, theme }) => ({
    background: theme.color.background,
    display: isCentered ? 'flex' : 'block',
    alignItems: isCentered ? 'center' : 'initial',
    justifyContent: isCentered ? 'center' : 'initial',
    minHeight: isInDocs ? '200px' : '100vh',
    minWidth:  isInDocs ? '400px' : '100vw',
  })
);

const PaddingWrapper = styled.div<{
  isCentered: boolean;
}>(
  ({ isCentered }) => ({
    padding: isCentered ? '10px' : '0',
  })
);

const withThemedBackground: Decorator = (StoryFn, { globals, parameters, viewMode }) => {
  const theme = globals.theme === 'dark' ? darkTheme : lightTheme;
  const isCentered = parameters.layout === 'centered'
  const isInDocs = viewMode === 'docs';
  
  return (
    <ThemedBackground theme={theme} isCentered={isCentered} isInDocs={isInDocs}>
      <PaddingWrapper isCentered={isCentered}>
        <StoryFn />
      </PaddingWrapper>
    </ThemedBackground>
  );
};


const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      // OPTION 1 - Use this option to inject your global style that already sets a background using your theme.
      // This is the recommended option.
      // GlobalStyles: GlobalStyle,
    }),
    // OPTION 2 - Add your own decorator to set a themed background if for some reason you can't use global styles.
    // Note that this has side effects on centered layout and on dimension calculation in docs mode.
    withThemedBackground,
  ],
};

export default preview;
