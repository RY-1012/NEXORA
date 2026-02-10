import { InjectionToken } from '@angular/core';

export interface AppRuntimeConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppRuntimeConfig>('APP_CONFIG');

export const DEFAULT_APP_CONFIG: AppRuntimeConfig = {
  apiUrl: 'http://localhost:3000/api/v1'
};

export const runtimeConfigFactory = (): AppRuntimeConfig => {
  if (typeof window === 'undefined') {
    return DEFAULT_APP_CONFIG;
  }
  const runtime = (window as { NEXORA_CONFIG?: Partial<AppRuntimeConfig> }).NEXORA_CONFIG;
  return {
    apiUrl: runtime?.apiUrl ?? DEFAULT_APP_CONFIG.apiUrl
  };
};
