import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import EssAdapter from 'ess/adapters/ess';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  Resolver: Resolver,
  ApplicationAdapter: EssAdapter
});

loadInitializers(App, config.modulePrefix);

export default App;
