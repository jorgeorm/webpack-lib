module.exports = exports = {};

const DEFAULT_URL_OPTIONS = {
    limit: 9000,
    name: '[name].[ext]'
};

const DEFAULT_IMAGE_WP_OPTIONS = {
    mozjpeg: { progressive: true, quality: 65 },
    // optipng.enabled: false will disable optipng
    optipng: { enabled: false },
    pngquant: { quality: '65-90', speed: 4 },
    gifsicle: { interlaced: false },
    // the webp option will enable WEBP
    webp: { quality: 75 }
};

/**
 * @constant {Object} DEFAULT_IMAGE_WP_OPTIONS Configures image-webpack-loader to compress images by using (mozjpeg, optipng, pngquant, gifsicle, webp)
 */
exports.DEFAULT_IMAGE_WP_OPTIONS = DEFAULT_IMAGE_WP_OPTIONS

/**
 * Build configuration required to load images and perform a basic optimization
 * 
 * @param {Object} imgs
 * @param {string | array} [imgs.include] - Directory to be scanned
 * @param {string | array} [imgs.exclude] - Directories that are not going to be parsed by the loader
 * @param {string | array | RegExp} [imgs.test] - Webpack's test for image types
 * @param {Object} [imgs.urlLoaderOpts] - Options for url-loader @see {@link https://github.com/webpack-contrib/url-loader#options}
 * @param {Object} [imgs.imgWpLoaderOpts] - Options for image-webpack-loader @see {@link https://github.com/tcoopman/image-webpack-loader#options}
 * @param {boolean} [imgs.compress] - Will trigger the compression of images
 * 
 * @return {Object}
*/
exports.loadImages = ({ include, exclude, test, urlLoaderOpts = DEFAULT_URL_OPTIONS, imgWpLoaderOpts, compress = typeof imgWpLoaderOpts !== 'undefined' } = {}) => {
    const imageLoaders = [
        { loader: 'url-loader', options: urlLoaderOpts },
        ...(compress ? [{ loader: 'image-webpack-loader', options: imgWpLoaderOpts }] : [])
    ];
    
    return {
        module: {
            rules: [{
                test: test || /\.(png|jpe?g|gif|svg|ico)$/,
                include,
                exclude,
                use: imageLoaders
            }]
        }
    };
}

