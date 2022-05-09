module.exports = () => {
  const BASE_URL = process.env.BASE_URL;
  const API_URL = process.env.API_URL;

  return {
    env: {
      API_BASE_URL: `${BASE_URL}/api`,
      IMAGES_BASE_URL: `${BASE_URL}/images`,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${API_URL}/:path*`, // Proxy to Backend
        },
        {
          source: '/images/:path*',
          destination: `${API_URL}/images/:path*`, // Proxy to Backend
        },
      ];
    },
  };
};
