import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Pressable, Text, View } from 'react-native';
import { activateLocale, type Locale } from '../i18n';
import { DbSandbox } from '../services/db/DbSandbox';
import { useMigrations } from '../services/db/useMigrations';
import { GeoProvider } from '../services/GeoLocation/GeoProvider';

const LocaleToggle = () => {
  const { i18n } = useLingui();
  const next: Locale = i18n.locale === 'pseudo-en' ? 'en' : 'pseudo-en';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        activateLocale(next);
      }}
    >
      <Text>
        {i18n.locale === 'pseudo-en' ?
          <Trans>Use English</Trans>
        : <Trans>Use QA locale</Trans>}
      </Text>
    </Pressable>
  );
};

export default function Index() {
  useMigrations();
  return (
    <GeoProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Trans>Edit app/index.tsx to edit this screen.</Trans>
        <LocaleToggle />
      </View>
      <DbSandbox />
    </GeoProvider>
  );
}
