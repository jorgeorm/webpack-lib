module.exports = exports = {};
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueTemplateCompiler = require('vue-template-compiler');

/**
 * Configures webpack loader for vuejs apps
 * @see {@link https://github.com/vuejs/vue-loader}
 * @param {object} config - Babel loader configuration object
 * @param {string | array} [config.include] - Directory to be scanned for config code
 * @param {string | array} [config.exclude] - Directories that are not going to be parsed by the babel loader
 * @param {VueTemplateCompiler} [config.compiler] - Override the default compiler used to compile <template> blocks in single file components
 * @param {object} [config.compilerOptions] - Options for the template compiler
 * @param {boolean} [config.shadowMode] - Compiled the component for usage inside Shadow DOM
 * @param {boolean} [config.prettify] - Used in davelopment mode, it may be disabled when [errors like this]{@link https://github.com/prettier/prettier/issues/4672}
 * @return {object} - Webpack configuration for the vue loader
 */
exports.loadVue = ({
  include,
  exclude,
  compiler = VueTemplateCompiler,
  compilerOptions = {},
  shadowMode = false,
  prettify = true,
} = {}) => ({
  module: {
    rules: [
      {
        test: /\.vue$/,
        include,
        exclude,
        loader: 'vue-loader',
        options: {
          compiler,
          compilerOptions,
          shadowMode,
          prettify,
        },
      },
    ],
  },
  plugins: [
    /**
     * This plugin is required in order the loader to work
     * @see {@link https://vue-loader.vuejs.org/guide/#webpack-configuration}
     */
    new VueLoaderPlugin(),
  ],
});
