const CracoLessPlugin = require('craco-less');
// import * as  CracoLessPlugin from 'craco-less';
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            modifyVars:getThemeVariables({
              // dark: true,
            }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};