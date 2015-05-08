import Ember from 'ember';
import AdapterSortableMixin from '../../../mixins/adapter-sortable';
import { module, test } from 'qunit';

module('AdapterSortableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var AdapterSortableObject = Ember.Object.extend(AdapterSortableMixin);
  var subject = AdapterSortableObject.create();
  assert.ok(subject);
});
