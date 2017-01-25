import Ember from 'ember';
import FrameworkExtensionsInitializer from '../../../initializers/framework-extensions';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | framework extensions', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  FrameworkExtensionsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
