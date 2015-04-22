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

test('isActive is true when index is equal to selectedIndex', function (assert) {
  assert.expect(2);

  var CardItemObject = Ember.Object.extend(CardItemMixin);
  var component = CardItemObject.create({ selectedIndex: 1, index: 0 });

  assert.ok(!component.get('isActive'), 'isActive is false when selectedIndex and index are not equal');

  Ember.run(() => {
    component.setProperties({ selectedIndex: 0, index: 0 });
    assert.ok(component.get('isActive'), 'isActive is true when selectedIndex and index are equal');
  });
});

