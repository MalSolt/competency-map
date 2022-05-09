import createCache from '@emotion/cache';

// eslint-disable-next-line import/no-default-export
export default function createEmotionCache() {
  return createCache({ key: 'css' });
}
