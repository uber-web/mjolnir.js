module.exports = {
  env: {
    cjs: {
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    },
    esm: {
      presets: [['@babel/env', { modules: false }]],
      plugins: [['@babel/transform-runtime', { useESModules: true }]]
    }
  }
}
