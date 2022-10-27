/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly FINHAVA_DEFAULT_LOCALE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}