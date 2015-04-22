import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import t from 'ess/helpers/t';

moduleForComponent('payslip-donut-chart', {
  beforeEach: function () {
    Ember.Handlebars.registerHelper('t', t);
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

test('isActive adds card--active class to component div', function (assert) {
  assert.expect(1);

  var component = this.subject();
  var $el;

  //render component
  this.render();

  //element is not available until rendered
  $el = component.$();

  Ember.run(() => {
    component.set('isActive', true);
    assert.ok($el.hasClass('card--active'), 'payslip-donut-chart element has class card--active');
  });
});
