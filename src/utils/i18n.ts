import * as i18n from 'i18n';

import { en } from '../locales';

const customI18n: any = {};

i18n.configure({
  register: customI18n,
  locales: ['en'],
  directory: `${__dirname}/../../locales`,
  objectNotation: true,
  updateFiles: false,
  defaultLocale: 'en',
  staticCatalog: {
    en,
  },
});

export { customI18n };
