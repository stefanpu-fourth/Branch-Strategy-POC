/* globals ga */
import Ember from 'ember';
import { initialize } from '../../../initializers/init-user';
import { module, test } from 'qunit';
import { defineFixture } from 'ic-ajax';

var container, application;

module('InitUserInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      defineFixture('/api/user', {
        response: { ExternalId: 1234 }
      });
      application = {
        deferReadiness() {},
        advanceReadiness() {}
      };
    });
  }
});

test('google analytics tracker setup', function(assert) {
  window.ga=sinon.spy();
  return initialize(application).then(() => {
    //First argument is create
    sinon.assert.calledWith(window.ga, 'create', 'unit-test-tracker', 'auto', { userId: 1234 });
    assert.ok(true, 'tracker configured correctly');
  });
});
