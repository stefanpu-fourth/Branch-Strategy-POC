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
    ENV.ftp = ftpConfig({ remoteRoot: '/ci-essui' });
    ENV.configure.configKeys.apiBaseUrl = 'http://10.10.20.80:83';
    ENV.configure.configKeys.hasUserEndpoint = false;
  }

  if (deployTarget === 'qa') {
    ENV.ftp = ftpConfig({ remoteRoot: '/qa-essui' });
    ENV.configure.configKeys.apiBaseUrl = 'http://qa-essapi.fourth.com';
    ENV.configure.configKeys.hasUserEndpoint = false;
  }

  if (deployTarget === 'qai') {
    ENV.ftp = ftpConfig({ host: 'ie1uiqui01.cloudapp.net', username: 'deploy', remoteRoot: '/qai-essui' }); 
    ENV.configure.configKeys.apiBaseUrl = 'https://IE1APIQAPI03.cloudapp.net';
  }

  if (deployTarget === 'production') { /*TODO*/ }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
