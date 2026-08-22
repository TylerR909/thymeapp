import { i18n } from '@lingui/core';
import { getLocales } from 'expo-localization';
import { messages as en } from '../locales/en/messages.po';
import { messages as pseudoEn } from '../locales/pseudo-en/messages.po';

export const defaultLocale = 'en';

export const locales = ['en', 'pseudo-en'] as const;
export type Locale = (typeof locales)[number];

const catalogs = {
  en,
  'pseudo-en': pseudoEn,
} as const;

export const isLocale = (value: string | null | undefined): value is Locale =>
  value != null && (locales as readonly string[]).includes(value);

export const resolveDeviceLocale = (): Locale => {
  const tag = getLocales()[0].languageTag.toLowerCase();
  if (tag.startsWith('pseudo')) return 'pseudo-en';
  return defaultLocale;
};

export const activateLocale = (locale: Locale): void => {
  i18n.loadAndActivate({ locale, messages: catalogs[locale] });
};

export const activateDefaultLocale = (): void => {
  activateLocale(resolveDeviceLocale());
};

export { i18n };
