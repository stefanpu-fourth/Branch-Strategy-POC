/* jshint node: true */
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ess',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    gaTracker:'UA-62678526-2',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    mobileTouch: {
      use: ['tap', 'press', 'pan', 'swipe'],
      alwaysTapOnPress: false,
      defaultTapOnPress: true,
      options: {
        domEvents: true
      },
      tune: {
        tap: {
          time: 250,
          threshold: 9
        }, //Hammer default is 250 / 2
        press: {
          time: 251,
          threshold: 9
        }, //Hammer default is 500 / 5
        swipe: {
          direction: 6,
          velocity: 0.3,
          threshold: 25
        },
        pan: {
          threshold: 5,
          direction: 6
        }
      }
    },
    pagination: {
      pageSize: 12
    }
  };

  ENV.user = 57354;
  ENV.apiBaseUrl = "http://fourth-employee-selfservice-dev.cloudapp.net:8080";

  if(environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if(environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if(environment === 'production') {
    ENV.gaTracker = 'UA-62678526-1';
  }

  return ENV;
};
