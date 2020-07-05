const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const resolveTsconfigPathsToAlias = require('./utils/resolve-tsconfig-path-to-webpack-alias');

const isDebugMode = !!process.env.DEBUG_MODE;
const env = process.env.ENV || 'development';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  distDir: '_next',
  webpack(config, { isServer }) {
    // from https://github.com/cyrilwanner/next-compose-plugins/issues/22#issuecomment-548791323

    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
      };
    }

    // add aliases from .tsconfig to webpack resolve config
    config.resolve.alias = {
      ...config.resolve.alias,
      ...resolveTsconfigPathsToAlias(),
    };

    // run linter in develop mode
    if (env === 'development' && !isDebugMode) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /.next/, /out/],
        enforce: 'pre',
        options: {
          emitWarning: true,
        },
      });
    }

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              'app/assets/styles/config/index.scss',
              'app/assets/styles/mixins/index.scss',
            ],
          },
        },
      ],
    });

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    );

    return config;
  },
};

module.exports = withPlugins(
  [
    withCss,
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
        [PHASE_PRODUCTION_BUILD]: {
          cssLoaderOptions: {
            localIdentName: '[hash:base64:8]',
          },
        },
      },
    ],
    withTypescript,
    withBundleAnalyzer,
  ],
  nextConfig,
);
