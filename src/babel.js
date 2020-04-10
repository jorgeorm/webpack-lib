module.exports = exports = {};
const { ENV_DEV } = require('./constants');

const PRESET_ENV = '@babel/preset-env';
// See: https://babeljs.io/docs/en/babel-preset-env#usebuiltins
const BUILT_INS_DEF= false;
// See: https://babeljs.io/docs/en/babel-preset-env#corejs
const COREJS_DEF = 2;
// See: https://babeljs.io/docs/en/babel-preset-env#corejs
const COREJS3_DEF = 3;
// See: https://babeljs.io/docs/en/babel-preset-env#targets
const TARGETS_DEF= {};
const TARGETS_TEST= {
 node: 'current',
};

/**
 * Gets a default development config using babel-preset-env
 * @see {@link https://babeljs.io/docs/en/babel-preset-env}
 * @param {object} options - Preset options
 * @param {"usage"|"entry"|false} [options.useBuiltIns] - Configures how the preset handles polyfills
 * @param {2|3|{ version: 2|3, proposals: boolean }} [options.corejs] - Ensure the preset injects the correct imports for your core-js version
 * @param {string|array<string>|{ [string]: string }} [options.targets] - Describes the environments you support/target for your project
 * @deprecated Use presetEnv instead
 */
exports.getDevelopmentConfig = ({
  useBuiltIns: BUILT_INS_DEF,
  corejs: COREJS_DEF,
  targets: TARGETS_DEF,
} = {}) => ([
  PRESET_ENV,
  {
    useBuiltIns: BUILT_INS_DEF,
    corejs: COREJS_DEF,
    targets: TARGETS_DEF,
  },
]);

/**
 * Gets a default test config using babel-preset-env
 * @see {@link https://babeljs.io/docs/en/babel-preset-env}
 * @param {object} options - Preset options
 * @param {string|array<string>|{ [string]: string }} [options.targets] - Describes the environments you support/target for your project
 */
exports.getTestConfig = ({
  targets: TARGETS_DEF,
} = {}) => ([
  PRESET_ENV,
  {
    targets: TARGETS_DEF,
  },
]);

/**
 * Gets a default config using babel-preset-env
 * @see {@link https://babeljs.io/docs/en/babel-preset-env}
 * @param {object} options - Preset options
 * @param {"usage"|"entry"|false} [options.useBuiltIns] - Configures how the preset handles polyfills
 * @param {2|3|{ version: 2|3, proposals: boolean }} [options.corejs] - Ensure the preset injects the correct imports for your core-js version
 * @param {string|array<string>|{ [string]: string }} [options.targets] - Describes the environments you support/target for your project
 */
exports.presetEnv = ({
  env = ENV_DEV,
  useBuiltIns = BUILT_INS_DEF,
  corejs = useBuiltIns === 'entry' || useBuiltIns === 'usage' ? COREJS3_DEF : undefined,
  targets = TARGETS_DEF,
} = {}) => ([
  PRESET_ENV,
  {
    useBuiltIns: BUILT_INS_DEF,
    corejs: COREJS_DEF,
    targets: TARGETS_DEF,
  },
]);

/**
 * Gets a vue preset config using vue babel-preset-jsx
 * @see {@link https://www.npmjs.com/package/@vue/babel-preset-jsx}
 * @param {object} options - Preset options
 * @param {"usage"|"entry"|false} [options.useBuiltIns] - Configures how the preset handles polyfills
 * @param {2|3|{ version: 2|3, proposals: boolean }} [options.corejs] - Ensure the preset injects the correct imports for your core-js version
 * @param {string|array<string>|{ [string]: string }} [options.targets] - Describes the environments you support/target for your project
 * @param {boolean} [options.functional] - Functional components syntactic sugar
 * @param {boolean} [options.injectH] - Automatic h injection syntactic sugar
 * @param {boolean} [options.vModel] - vModel syntactic sugar
 * @param {boolean} [options.vOn] - vOn syntactic sugar
 */
exports.presetVue = ({
  env = ENV_DEV,
  useBuiltIns = BUILT_INS_DEF,
  corejs = useBuiltIns === 'entry' || useBuiltIns === 'usage' ? COREJS3_DEF : undefined,
  targets = TARGETS_DEF,
  functional = true,
  injectH = true,
  vModel = true,
  vOn = true,
} = {}) => ([
  exports.presetEnv({
    env,
    useBuiltIns,
    corejs,
    targets,
  }),
  [
    '@vue/babel-preset-jsx',
    {
      functional,
      injectH,
      vModel,
      vOn,
    },
  ],
]);
