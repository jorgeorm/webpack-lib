module.exports = exports = {};

const { ENV_DEV } = require('./constants');

/**
 * Gets the default loaders to be used when loading CSS code.
 * Loaders will allow to use future css feature due to the use of postcss
 * Setup postcss for the features you want. @see {@link https://github.com/postcss/postcss-loader}
 * 
 * @param {string} [env=ENV_DEV]
 * @returns {array}
 */
function cssLoaders(env = ENV_DEV) {
    return [
        {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
                sourceMap: env === PROD || env === STG, // Loads sourcemaps if exists
                importLoaders: 1,
            }
            // Note: importLoaders cahnges the behavior of the loaders by allowing to import
            // .scss or .less or whatever other loader in an import
            // importLoaders: 2, // 0 => no loaders (default);
            // 1 => postcss-loader;
            // 2 => postcss-loader, another-loader
        },
        {
            loader: 'postcss-loader', // Postprocessor, transforms css
            options: { sourceMap: env === PROD || env === STG } // Loads sourcemaps if exists
        }
    ];
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
exports.loadCSS = function ({ include, exclude, loaders = cssLoaders() } = {}) {
    if (typeof loaders === 'undefined' || !loaders) throw Error('An array of loaders must be provided');
    
    const rootLoaders = [ 'style-loader' ];
    
    return {
        module: {
            rules: [{
                test: /\.css$/,
                include,
                exclude,
                rules: rootLoaders.concat(loaders)
            }]
        }
    };
}
