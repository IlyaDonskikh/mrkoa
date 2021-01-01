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
  api: {
    __: 't', // now req.__ becomes req.t
    __n: 'tn', // and req.__n can be called as req.tn
  },
});

// eslint-disable-next-line import/no-default-export
export { customI18n };
