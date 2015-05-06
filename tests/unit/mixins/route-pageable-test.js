import Ember from 'ember';
import RoutePaginationMixin from '../../../mixins/route-pageable';
import { module, test } from 'qunit';

module('RoutePageableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RoutePaginationObject = Ember.Object.extend(RoutePageableMixin);
  var subject = RoutePaginationObject.create();
  assert.ok(subject);
});
