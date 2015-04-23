import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('payslip', {
  // Specify the other units that are required for this test.
  needs: ['model:payslipElement']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
