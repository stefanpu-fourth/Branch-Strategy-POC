import Ember from 'ember';
import ControllerSetSelectedIndexMixin from '../../../mixins/controller-set-selected-index';
import { module, test } from 'qunit';

module('ControllerSetSelectedIndexMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ControllerSetSelectedIndexObject = Ember.Object.extend(ControllerSetSelectedIndexMixin);
  var subject = ControllerSetSelectedIndexMixin.create();
  assert.ok(subject);
});
