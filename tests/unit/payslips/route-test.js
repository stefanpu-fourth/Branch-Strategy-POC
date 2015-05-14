import {
  moduleFor,
  test
}
from 'ember-qunit';
import Ember from 'ember';

var mockController = Ember.Object.extend({
  attrs: {
    payslips: Ember.ArrayProxy.create({ content: Ember.A([1, 2, 3]) })
  }
});

moduleFor('route:payslips', {
  needs: []
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
