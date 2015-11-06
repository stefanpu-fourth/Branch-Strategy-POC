import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('payslips-time-chart', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject({
    payslips: [
      Ember.Object.create({ grossPay: 200, netPay: 180, formattedProcessingDate: '1 Mar' }),
      Ember.Object.create({ grossPay: 180, netPay: 160, formattedProcessingDate: '1 Apr' })
    ]
  });

  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
