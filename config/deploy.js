/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    'dist-dir': {
      distDir: 'dist'
    },
    configure: {
      configKeys: {
      }
    }
  };

  var ftpDetails = {
    host: 'IE1UIDUI01.northeurope.cloudapp.azure.com',
    username: 'menucycles',
    password: process.env['PASSWORD']
  };

  var ftpConfig = (config) => {
    return Object.assign({}, ftpDetails, config);
  };

  if (deployTarget === 'development') {
    ENV.ftp = ftpConfig({ remoteRoot: '/ci-marketplaceui' });
    ENV.configure.configKeys.apiBaseUrl = 'http://fourth-marketplace-purchasing-api-dv.azurewebsites.net';
    ENV.configure.configKeys.hasUserEndpoint = false;
  }

  if (deployTarget === 'qa') {
    ENV.ftp = ftpConfig({ remoteRoot: '/qa-marketplaceui' });
    ENV.configure.configKeys.apiBaseUrl = 'http://fourth-marketplace-purchasing-api-dv.azurewebsites.net';
    ENV.configure.configKeys.hasUserEndpoint = false;
  }

  if (deployTarget === 'production') { /*TODO*/ }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
