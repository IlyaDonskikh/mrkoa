/* eslint-disable global-require */
import * as i18n from 'i18n';

const customI18n: any = {};

i18n.configure({
  register: customI18n,
  locales: ['en'],
  directory: `${__dirname}/../../locales`,
  objectNotation: true,
  updateFiles: false,
  defaultLocale: 'en',
  staticCatalog: {
    en: require('../../locales/en'),
  },
});

// eslint-disable-next-line import/no-default-export
export { customI18n };
