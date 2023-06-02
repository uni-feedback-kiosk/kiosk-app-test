import { API, apiName } from './preload';

declare global {
  interface Window {
    [apiName]: API;
  }
}
