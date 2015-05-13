import Ember from 'ember';
import RouteSetSelectedIndexMixin from '../../../mixins/route-set-selected-index';
import { module, test } from 'qunit';

module('RouteSetSelectedIndexMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RouteSetSelectedIndexObject = Ember.Object.extend(RouteSetSelectedIndexMixin);
  var subject = RouteSetSelectedIndexObject.create();
  assert.ok(subject);
});
