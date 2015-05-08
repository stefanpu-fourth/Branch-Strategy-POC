import Ember from 'ember';
import ControllerPageableMixin from '../../../mixins/controller-pageable';
import { module, test } from 'qunit';

module('ControllerPageableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ControllerPageableObject = Ember.Object.extend(ControllerPageableMixin);
  var subject = ControllerPageableObject.create();
  assert.ok(subject);
});
