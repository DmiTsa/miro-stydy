/// <reference types="vite/client" />

//типизация переменные окружения. этот способ описан в документации vite
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
