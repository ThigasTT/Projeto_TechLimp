module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './app', // Alias para a pasta app
            '@assets': './assets' // Alias para a pasta assets
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.jpg',
            '.png',
            '.json'
          ]
        }
      ],
      'react-native-reanimated/plugin',
    ]
  };
};