/* globals ga */
import Ember from 'ember';
import { initialize } from '../../../initializers/init-user';
import { module, test } from 'qunit';

var container, application;


module('InitUserInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('it works Create GA', function(assert) {
  window.ga=sinon.spy();
  initialize(container, application);
  //First argument is create
  assert.equal('create', window.ga.args[0][0]);
});

test('it works Auto GA', function(assert) {
  window.ga=sinon.spy();
  initialize(container, application);
  //Third argument is auto
  assert.equal('auto', window.ga.args[0][2]);

});
