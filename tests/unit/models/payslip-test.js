import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('payslip', {
  // Specify the other units that are required for this test.
  needs: ['model:payslipElement']
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

test('totalDeductions returns currentGrossPay minus netPay as a price (fixed float to 2)', function (assert) {
  var model = this.subject();

  Ember.run(() => {
    model.setProperties({
      currentGrossPay: 2167,
      netPay: 1731
    });

    assert.equal(model.get('totalDeductions'), 436.00, 'totalDeductions is equal to 436.00 (gross - net)');
  });
});
