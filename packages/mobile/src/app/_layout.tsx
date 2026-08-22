// organize-imports-ignore — Temporal polyfill, then LogTape, then the app
import 'temporal-polyfill/global';
import { log } from '../logging';
import { I18nProvider, type TransRenderProps } from '@lingui/react';
import { Stack } from 'expo-router';
import { Text } from 'react-native';
import { activateDefaultLocale, i18n } from '../i18n';

activateDefaultLocale();
log.debug('mobile logger ready');

const DefaultText = ({ children }: TransRenderProps) => <Text>{children}</Text>;

export default function RootLayout() {
  return (
    <I18nProvider i18n={i18n} defaultComponent={DefaultText}>
      <Stack />
    </I18nProvider>
  );
}
