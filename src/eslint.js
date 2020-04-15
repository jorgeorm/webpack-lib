module.exports = exports = {};

/**
 * Eslint config to extend from. Includes react
 * @see {@link https://www.npmjs.com/package/eslint-config-airbnb}
 */
exports.ESLINT_EXTENDS = 'airbnb';

/**
 * Eslint config to extend from
 * @see {@link https://www.npmjs.com/package/eslint-config-airbnb-base}
 */
exports.ESLINT_BASE_EXTENDS = 'airbnb-base';

/**
 * Eslint vue config to extend from
 * @see {@link https://www.npmjs.com/package/eslint-plugin-vue}
 */
exports.ESLINT_VUE_EXTENDS = [exports.ESLINT_BASE_EXTENDS, 'plugin:vue/recommended'];

/**
 * Eslint vue parser
 * @see {@link https://www.npmjs.com/package/vue-eslint-parser}
 */
exports.ESLINT_VUE_PARSER = 'vue-eslint-parser';
