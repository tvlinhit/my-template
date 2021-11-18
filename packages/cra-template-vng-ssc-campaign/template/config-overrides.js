const apiMocker = require('connect-api-mocker');
const { overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  return {
    ...config,
    before: (app, server) => {
      //call cra before function to not break code
      config.before(app, server);
      //Then add our mocker url and folder
      app.use('/api', apiMocker('mock-api'));
    },
  };
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
