module.exports = exports = {};

const HMRPlugin = require('webpack').HotModuleReplacementPlugin;

/**
 * Configures webpack-dev-server, webpack-dev-server keeps bundles in memory.
 * When accessed through http://localhost:8080/webpack-dev-server/, WDS provides
 * status information at the top
 * @param {object} server - The server that's going to be started
 * @param {string} server.host - Host were is going to be run ie: 0.0.0.0
 * @param {number} server.port - Port number were the server is going to listen ie: 8080
 * @param {boolean} server.historyApiFallback - Enables history API when using html5HistoryApi routing.
 * @param {boolean} server.hmr - Enables hot module replacement in server
 * @return {object} - Webpack configuration for the Dev server
 */
exports.webpackDevServer = ({ host, port, historyApiFallback = false, hmr = false } = {}) => {
    const wdsConfig = {
        devServer: {
            // When using docker, vagrant or virtualization set
            // host || '0.0.0.0' it will be available to all network devices
            host,
            port,
    
            // Displays only errors to reduce the amount of output
            // values: errors-only | minimal
            stats: 'errors-only',
    
            // Opens the browser once dev-server is up and running
            open: true,
    
            // Shows a full-screen overlay in the browser when there are compiler errors or warnings
            overlay: {
                errors: true,
                warnings: true,
            },
    
            // For when you are using HTML5 History API based routing.
            historyApiFallback,
        },
    };

    if (hmr) {
        wdsConfig.hotOnly = hmr; // Does not refresh when hot loading fails
        wdsConfig.plugins = [ new HMRPlugin() ]
    }

    return wdsConfig;
}