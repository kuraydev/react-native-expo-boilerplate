import type { ThemePack } from '../types';

export const defaultPack: ThemePack = {
  name: 'default',
  light: {
    text: '#000000',
    textSecondary: '#60646C',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    primary: '#4A6CF7',
    onPrimary: '#ffffff',
    danger: '#D93F4C',
    success: '#2E9E5B',
    border: '#E0E1E6',
  },
  dark: {
    text: '#ffffff',
    textSecondary: '#B0B4BA',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    primary: '#6E8BFF',
    onPrimary: '#0B0C0E',
    danger: '#FF6B76',
    success: '#4CC97F',
    border: '#2E3135',
  },
};
