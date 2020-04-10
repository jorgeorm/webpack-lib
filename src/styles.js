module.exports = exports = {};
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { ENV_DEV, ENV_PROD, ENV_STG } = require('./constants');


/**
 * Gets the default loaders to be used when loading CSS code.
 * Loaders will allow to use future css feature due to the use of postcss
 * Setup postcss for the features you want. @see {@link https://github.com/postcss/postcss-loader}
 *
 * @param {string} [env=ENV_DEV]
 * @param {number} importLoaders importLoaders cahnges the behavior of the loaders by allowing to import .scss or .less or whatever other loader in a @import
 * @returns {array}
 */
function cssLoaders(env = ENV_DEV, importLoaders = 1) {
    return [
        {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
                sourceMap: env === ENV_DEV || env === ENV_STG, // Loads sourcemaps if exists
                importLoaders,
            }
        },
        {
            loader: 'postcss-loader', // Postprocessor, transforms css
            options: { sourceMap: env === ENV_DEV || env === ENV_STG } // Loads sourcemaps if exists
        }
    ];
}

/**
 * Contains common configuration for loading sass code
 * @param {string} [env] - Represents the environment that's going to parse the config 'production', 'staging', 'development'
 * @param {array} baseLoaders - Array of loaders to be used after loading the specific sass files
 */
function sassLoaders(env = ENV_DEV, baseLoaders = cssLoaders(env, 0)) {
    return ([
        ...baseLoaders,
        {
            loader: 'sass-loader', // compiles Sass to CSS
            options: { sourceMap: env === ENV_DEV || env === ENV_STG } // Loads sourcemaps if exists
            // In case is required to pass env vars.
            // options: {
            //     data: '$env: ' + process.env.NODE_ENV + ';'
            // }
        }
    ]);
}

/**
 * Configures webpack loader for app wide vanilla css, uses style-loader since implements HMR
 *
 * @param {object} css - Css loader configuration object
 * @param {array} css.loaders - Array of loaders that will be used to parse the rule, by default will be the cssLoaders function
 * @param {string | array} [css.include] - Directory to be scanned for vanilla css code
 * @param {string | array} [css.exclude] - Directories that are not going to be parsed by the css loader
 * @return {object} - Webpack configuration for the vanilla css loader
 */
exports.loadCSS = ({ loaders = cssLoaders(), include, exclude } = {}) => {
    if (typeof loaders === 'undefined' || !loaders) throw Error('An array of loaders must be provided');

    return {
        module: {
            rules: [{
                test: /\.css$/,
                include,
                exclude,
                rules: [
                    // Garantees style-loader is called only if asset is called by js or jsx
                    {
                        issuer: /\.(js|jsx)$/,
                        loader: 'style-loader',
                    },
                    // Garantees vue-style-loader is called only if asset is called by vue
                    {
                        issuer: /\.vue$/,
                        loader: 'vue-style-loader',
                    },
                    { use: loaders }
                ]
            }]
        }
    };
}

/**
 * Configures webpack loader for app wide vanilla css, uses style-loader since implements HMR
 *
 * @param {object} sass - sass loader configuration object
 * @param {array} sass.loaders - Array of loaders that will be used to parse the rule, by default will be the sassLoaders function
 * @param {string | array} [sass.include] - Directory to be scanned for vanilla sass code
 * @param {string | array} [sass.exclude] - Directories that are not going to be parsed by the sass loader
 * @return {object} - Webpack configuration for the vanilla sass loader
 */
exports.loadSASS = ({ loaders = sassLoaders(), include, exclude } = {}) => ({
    module: {
        rules: [{
            test: /\.s(c|a)ss$/,
            include,
            exclude,
            rules: [
                // Garantees style-loader is called only if asset is called by js or jsx
                {
                    issuer: /\.(js|jsx)$/,
                    loader: 'style-loader',
                },
                // Garantees vue-style-loader is called only if asset is called by vue
                {
                    issuer: /\.vue$/,
                    loader: 'vue-style-loader',
                },
                { use: loaders }
            ]
        }]
    }
})

/**
 * Configures webpack loader for app wide vanilla css and extracts it to a file
 * @see {@link https://github.com/webpack-contrib/mini-css-extract-plugin}
 * @param {object} css - Css loader configuration object
 * @param {MiniCssExtractPlugin} css.extractor - Instance of MiniCssExtractPlugin to be used by the loader, each extractor will generate its own bundle
 * @param {string} [css.env] - Environment that's going to be used to parse the configuration
 * @param {array} [css.loaders] - Loaders that are going to be used to process the rule by default loaders will be obtained by the cssLoaders function
 * @param {string | array} [css.include] - Directory to be scanned for vanilla css code
 * @param {string | array} [css.exclude] - Directories that are not going to be parsed by the css loader
 * @param {string} [css.filename] - Pattern that webpack is going to use to name the bundle
 * @return {object} - Webpack configuration for the vanilla css loader
 */
exports.extractCSS = ({ extractor, env = ENV_PROD, loaders = cssLoaders(env), include, exclude, filename='[name].css' } = {}) => {
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const extractorInstance = extractor || new MiniCssExtractPlugin({
        filename
    });

    return {
        module: {
            rules: [{
                test: /\.css$/,
                include,
                exclude,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...loaders
                ]
            }]
        },
        plugins: [extractorInstance]
    };
}

/**
 * Configures webpack loader for app sass and extracts it to a file
 * @see {@link https://github.com/webpack-contrib/mini-css-extract-plugin}
 * @param {object} css - Css loader configuration object
 * @param {MiniCssExtractPlugin} css.extractor - Instance of MiniCssExtractPlugin to be used by the loader, each extractor will generate its own bundle
 * @param {string} [css.env] - Environment that's going to be used to parse the configuration
 * @param {array} [css.loaders] - Loaders that are going to be used to process the rule by default loaders will be obtained by the cssLoaders function
 * @param {string | array} [css.include] - Directory to be scanned for vanilla css code
 * @param {string | array} [css.exclude] - Directories that are not going to be parsed by the css loader
 * @param {string} [css.filename] - Pattern that webpack is going to use to name the bundle
 * @return {object} - Webpack configuration for the vanilla css loader
 */
exports.extractSASS = ({ extractor, env = ENV_PROD, loaders = sassLoaders(env), include, exclude, filename='[name].css' } = {}) => {
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const extractorInstance = extractor || new MiniCssExtractPlugin({
        filename
    });

    return {
        module: {
            rules: [{
                test: /\.s(c|a)ss$/,
                include,
                exclude,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...loaders
                ]
            }]
        },
        plugins: [extractorInstance]
    };
}

/**
 * Configures purgecss-webpack-plugin to remove unused css.
 *
 * @param {Object} pureCssConfig @see https://github.com/FullHuman/purgecss-webpack-plugin#options
 * @return {Object}
*/
exports.purgeCSS = (pureCssConfig) => {
    if (typeof pureCssConfig === 'undefined') throw Error('A configuration object for purgecss must be provided, see https://github.com/FullHuman/purgecss-webpack-plugin#options')

    return { plugins: [ new PurgeCSSPlugin(pureCssConfig) ] }
};

/**
 * Configures stylelint-webpack-plugin to enforce conventions in your styles
 * @see {@link https://github.com/webpack-contrib/stylelint-webpack-plugin}
 * @param {object} config - Stylelint object configuration object
 * @param {string|array} [config.files] - Specify the glob pattern for finding files
 * @param {boolean} [config.fix] - If true, stylelint will fix as many errors as possible. The fixes are made to the actual source files
 * @param {string|function} [config.formatter] - Specify the formatter that you would like to use to format your results
 * @return {object} - Webpack configuration for the stylelint plugin
 */
exports.stylelintPlugin = ({
  files = '**/*.s?(a|c)ss',
  fix = false,
  formatter = 'string',
} = {}) => ({
  plugins: [new StylelintPlugin({
    files,
    fix,
    formatter,
  })],
});

