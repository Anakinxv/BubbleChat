const withTM = require("next-transpile-modules")([
  "@uppy/core",
  "@uppy/dashboard",
  "@uppy/image-editor",
  "@uppy/webcam",
]);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    viewTransition: true,
    turbopack: true,
  },
  webpack(config: any) {
    // Añadimos soporte para importar SVGs como componentes React
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = withTM(nextConfig);
