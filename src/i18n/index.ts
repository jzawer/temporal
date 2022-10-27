import { nextTick } from 'vue';
import { createI18n, type I18n } from 'vue-i18n';

export const SUPPORT_LOCALES = ['en', 'es'];

export function setupI18n(options = { locale: 'es',  }): I18n {
  const i18n = createI18n({
    ...options,
    legacy: false,
    allowComposition: true,
    fallbackLocale: 'en'
  });
  loadLocaleMessages(i18n, options.locale);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

export function setI18nLanguage(i18n: I18n<{}, {}, {}, string, false>, locale: string): void {
  i18n.global.locale.value = locale;
}

export async function loadLocaleMessages(i18n: I18n<{}, {}, {}, string, false>, locale: string): Promise<void> {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  );

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}