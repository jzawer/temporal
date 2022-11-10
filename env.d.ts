/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly FINHAVA_DEFAULT_LOCALE: string;
  readonly FINHAVA_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
