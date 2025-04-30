/// <reference types="vite/client" />

// ここに追加
declare const __APP_NAME__: string;
declare const __APP_VERSION__: string;

// 他の型定義があればそのまま残す
interface ImportMetaEnv {
  // readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
