import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import currency from 'ess/helpers/currency';
import t from 'ess/helpers/t';

moduleForComponent('payslip-donut-chart', {
  beforeEach: function () {
    Ember.Handlebars.registerHelper('t', t);
    Ember.Handlebars.registerHelper('currency', currency);
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
