import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('payslip-element', {
  // Specify the other units that are required for this test.
  needs: ['model:payslipElement']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('label returns a formatted string (description units@rate) or the description (if units && rate are falsy', function (assert) {
  assert.expect(3);

  var model = this.subject();

  Ember.run(() => {
    model.set('description', 'Tax');
    assert.equal(model.get('label'), 'Tax', 'Label is equal to tax');

    model.set('units', 1);
    assert.equal(model.get('label'), 'Tax', 'Label is still equal to tax as rate is falsy');

    model.set('rate', 500.00);
    assert.equal(model.get('label'), 'Tax 1@500.00', 'Label is equal to Tax 1@500.00');
  });
});

