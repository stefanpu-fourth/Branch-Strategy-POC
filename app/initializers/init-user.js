import Ember from 'ember';
import config from 'ess/config/environment';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'init-user',
  initialize: initialize
};
