const {getWebpackConfig} = require('ocular-dev-tools');

module.exports = env => {
  const config = getWebpackConfig(env);

  config.resolve = {...config.resolve, extensions: ['.ts', '.tsx', '.js', '.json']};

  config.module.rules = [
    ...config.module.rules.filter(r => r.loader !== 'babel-loader'),
    {
      // Compile source using babel
      test: /(\.js|\.ts|\.tsx)$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
      options: {
        presets: [
          ['@babel/preset-env', {targets: 'last 2 chrome versions'}],
          '@babel/preset-typescript'
        ],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ];

  return config;
};
