import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('payslip-detail', {
  needs: [
    'helper:t',
    'helper:moment',
    'helper:currency',
    'component:svg-icon',
    'template:partials/icons/x'
  ],
  unit: true
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
