import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('payslip', {
  // Specify the other units that are required for this test.
  needs: ['model:payslip-element']
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('currentPayPeriod returns payPeriod or monthWeekNumber (if payPeriod is falsy)', function (assert) {
  var model = this.subject();

  Ember.run(() => {
    model.set('payPeriod', '12');
    assert.equal(model.get('currentPayPeriod'), '12', 'currentPayPeriod is equal to 12');

    model.setProperties({
      payPeriod: null,
      monthWeekNumber: 24
    });
    assert.equal(model.get('currentPayPeriod'), 24, 'currentPayPeriod is equal to 24');
  });
});
