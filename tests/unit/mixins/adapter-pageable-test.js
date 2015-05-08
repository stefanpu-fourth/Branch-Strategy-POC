import Ember from 'ember';
import AdapterPageableMixin from '../../../mixins/adapter-pageable';
import { module, test } from 'qunit';

module('AdapterPageableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var AdapterPageableObject = Ember.Object.extend(AdapterPageableMixin);
  var subject = AdapterPageableObject.create();
  assert.ok(subject);
});
