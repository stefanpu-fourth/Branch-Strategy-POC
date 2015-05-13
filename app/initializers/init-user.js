import config from 'ess/config/environment';

export function initialize(/*container, application */) {
  ga('create', config.gaTracker, 'auto', {
    userId: '123456'
  });
}

export default {
  name: 'init-user',
  initialize: initialize
};
