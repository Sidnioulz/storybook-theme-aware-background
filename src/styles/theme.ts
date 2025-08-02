import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: 'light' | 'dark';
    color: {
      text: string;
      background: string;
    };
  }
}

export type { DefaultTheme };

const baseColors = {
  white: '#DFEFFF ',
  black: '#103020',
};

export const lightTheme: DefaultTheme = {
  color: {
    text: baseColors.black,
    background: baseColors.white,
  },
  name: 'light',
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  color: {
    text: baseColors.white,
    background: baseColors.black,
  },
  name: 'dark',
};
