import Ember from 'ember';
import AdapterFilterableMixin from '../../../mixins/adapter-filterable';
import { module, test } from 'qunit';

module('AdapterFilterableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var AdapterFilterableObject = Ember.Object.extend(AdapterFilterableMixin);
  var subject = AdapterFilterableObject.create();
  assert.ok(subject);
});
