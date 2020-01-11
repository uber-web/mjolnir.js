const resolve = require('path').resolve;

const DEPENDENCIES = require('./package.json').dependencies;
// eslint-disable-next-line import/no-extraneous-dependencies
const ALIASES = require('ocular-dev-tools/config/ocular.config')({
  root: resolve(__dirname, '..')
}).aliases;

// When duplicating example dependencies in website, autogenerate
// aliases to ensure the website version is picked up
// NOTE: module dependencies are automatically injected
// TODO - should this be automatically done by ocular-gatsby?
const dependencyAliases = {};
for (const dependency in DEPENDENCIES) {
  dependencyAliases[dependency] = `${__dirname}/node_modules/${dependency}`;
}

const DOCS = require('../docs/table-of-contents.json');

module.exports = {
  logLevel: 4,

  PATH_PREFIX: '/mjolnir.js',

  DOC_FOLDER: `${__dirname}/../docs/`,
  ROOT_FOLDER: `${__dirname}/../`,
  DIR_NAME: __dirname,

  DOCS,

  PROJECTS: [
    {
      title: 'deck.gl',
      url: 'https://deck.gl'
    },
    {
      title: 'luma.gl',
      url: 'https://luma.gl'
    },
    {
      title: 'react-map-gl',
      url: 'https://uber.github.io/react-map-gl'
    },
    {
      title: 'nebula.gl',
      url: 'https://nebula.gl/'
    }
  ], // Other linked projects

  PROJECT_TYPE: 'github',
  PROJECT_NAME: 'mjolnir.js',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'https://github.com/uber-web/mjolnir.gl',
  PROJECT_DESC: 'Event and Gesture Handling for Evergreen Browsers',

  FOOTER_LOGO: '',

  HOME_PATH: '/',
  HOME_HEADING: 'Event and Gesture Handling for Evergreen Browsers',
  HOME_RIGHT: null,
  HOME_BULLETS: [
    {
      text: 'Unifies Pointer Events',
      desc: 'Work with modern point events across all browsers',
      img: 'images/icon-high-precision.svg'
    },
    {
      text: 'Touch Support through Hammerjs',
      desc: 'Proven cross platform touch events powered by hammer.js',
      img: 'images/icon-high-precision.svg'
    }
  ],

  EXAMPLES: [
    {
      title: 'EventManager',
      image: 'images/icon-high-precision.svg',
      componentUrl: resolve(__dirname, '../examples/main/app.js'),
      path: 'examples/main'
    }
  ],

  ADDITIONAL_LINKS: [],

  GA_TRACKING: null,

  // For showing star counts and contributors.
  // Should be like btoa('YourUsername:YourKey') and should be readonly.
  GITHUB_KEY: null,

  // Avoids duplicate conflicting inputs when importing from examples folders
  // Ocular adds this to gatsby's webpack config
  webpack: {
    resolve: {
      // modules: [resolve(__dirname, './node_modules')],
      alias: Object.assign({}, ALIASES, dependencyAliases)
      // Local aliases need to be set in local gatsby node!
    }
  }
};
