import Ember from 'ember';
import CardItemMixin from '../../../mixins/card-item';
import { module, test } from 'qunit';

module('CardItemMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var CardItemObject = Ember.Object.extend(CardItemMixin);
  var subject = CardItemObject.create();
  assert.ok(subject);
});
