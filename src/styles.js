module.exports = exports = {};

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
                sourceMap: env === ENV_PROD || env === ENV_STG, // Loads sourcemaps if exists
                importLoaders,
            }
        },
        {
            loader: 'postcss-loader', // Postprocessor, transforms css
            options: { sourceMap: env === ENV_PROD || env === ENV_STG } // Loads sourcemaps if exists
        }
    ];
}

/**
 * Contains common configuration for loading sass code
 * @param {string} [env] - Represents the environment that's going to parse the config 'production', 'staging', 'development'
 * @param {array} baseLoaders - Array of loaders to be used after loading the specific sass files
 */
function sassLoaders(env = DEV, baseLoaders = cssLoaders(env, 0)) {
    return ([
        ...baseLoaders,
        {
            loader: 'sass-loader', // compiles Sass to CSS
            options: { sourceMap: env === ENV_PROD || env === ENV_STG } // Loads sourcemaps if exists
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
    
    const rootLoaders = [ 'style-loader' ];
    
    return {
        module: {
            rules: [{
                test: /\.css$/,
                include,
                exclude,
                rules: [
                    // Garantees style-loader is called only if asset is called by js
                    {
                        issuer: /\.jsx?$/,
                        loader: 'style-loader',
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
exports.loadSASS = ( { loaders = sassLoaders(), include, exclude } ) => ({
    module: {
        rules: [{
            test: /\.s(c|a)ss$/,
            include,
            exclude,
            rules: [
                // Garantees style-loader is called only if asset is called by js
                {
                    issuer: /\.jsx?$/,
                    loader: 'style-loader',
                },
                { use: loaders }
            ]
        }]
    }
})
