//eslint-disable

const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    // if (config.output.format === 'umd') {
    delete config.external;

    // config.plugins.push(
    //   alias({
    //     entries: [
    //       { find: 'react', replacement: 'preact/compat' },
    //       { find: 'react-dom', replacement: 'preact/compat' },
    //     ],
    //   })
    // );
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      })
    );

    return config;
  },
};
