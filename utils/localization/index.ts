/**
 * localization module
 * lib - https://github.com/isaachinman/next-i18next
 * creates NextI18Next instance with middleware and translate components and methods
 */

import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  fallbackLng: 'en',
  otherLanguages: [],
  defaultNS: 'common',
  ns: ['common'],
  returnEmptyString: false,
  serverLanguageDetection: false,
  // workaround until next-i18next support public path
  // https://github.com/isaachinman/next-i18next/issues/523
  localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
  localeSubpaths: {},
});

export const getLanguagesFromReq = (req): { all: string[], current: string } => {
  const { i18n: { language, options: { defaultLanguage, otherLanguages } } } = req;

  return {
    current: language,
    all: [...otherLanguages, defaultLanguage],
  };
};

export default NextI18NextInstance;

export const {
  appWithTranslation,
  withTranslation,
  Link,
  Router,
  i18n,
  useTranslation
} = NextI18NextInstance;
