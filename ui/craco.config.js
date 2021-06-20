// This craco config allows importing typescript files from directories outside /src.
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          // This is where the fun begins!
          removeModuleScopingPlugin(webpackConfig);
          // Amend this with the root paths you wish to import from
          enableTypescriptImportsFromExternalPaths(webpackConfig, [
            path.resolve(__dirname, '../shared/'),
          ]);
          return webpackConfig;
        },
      },
    },
  ],
};

function removeWebpackPlugin(webpackConfig, pluginName) {
  const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
    ({ constructor }) => constructor && constructor.name === pluginName
  );
  if (scopePluginIndex > -1) {
    webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
  }
}

function enableTypescriptImportsFromExternalPaths(webpackConfig, newIncludePaths) {
  const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
  if (oneOfRule) {
    const tsxRule = oneOfRule.oneOf.find(
      (rule) => rule.test && rule.test.toString().includes('tsx')
    );

    if (tsxRule) {
      tsxRule.include = Array.isArray(tsxRule.include)
        ? [...tsxRule.include, ...newIncludePaths]
        : [tsxRule.include, ...newIncludePaths];
    }
  }
}

const removeModuleScopingPlugin = (webpackConfig) =>
  removeWebpackPlugin(webpackConfig, 'ModuleScopePlugin');
