import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('payslip-donut-chart', {
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

test('isActive is true when index is equal to selectedIndex', function (assert) {
  var component = this.subject({ selectedIndex: 1, index: 0 });

  assert.ok(!component.get('isActive'), 'isActive is false when selectedIndex and index are not equal');

  Ember.run(() => {
    component.setProperties({ selectedIndex: 0, index: 0 });
    assert.ok(component.get('isActive'), 'isActive is true when selectedIndex and index are equal');
  });
});

test('pathStyles returns a string for the styles of the chart path', function (assert) {
  var component = this.subject({ grossPay: 1000, netPay: 750, selectedIndex: 0, index: 0 });
  var expected = 'stroke-dasharray: 903.125px, 903.125px; stroke-dashoffset: 225.78125px;';
  var el;
  var path;

  //render the component
  this.render();

  el = component.element;
  path = el.querySelector('.payslip__chartpath');

  assert.equal(component.get('pathStyles').string, expected, 'pathStyles returns the expected css string');
  assert.equal(path.style.cssText, expected, 'pathStyles was set on .payslip__chartpath element');
});
