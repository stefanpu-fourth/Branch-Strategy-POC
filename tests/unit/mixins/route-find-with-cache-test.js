import Ember from 'ember';
import RouteFindWithCacheMixin from '../../../mixins/route-find-with-cache';
import { module, test } from 'qunit';

module('Unit | Mixin | route find with cache');

// Replace this with your real tests.
test('it works', function(assert) {
  var RouteFindWithCacheObject = Ember.Object.extend(RouteFindWithCacheMixin);
  var subject = RouteFindWithCacheObject.create();
  assert.ok(subject);
});
