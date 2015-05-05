import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('swipe-item', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
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

test('isActive is true when index is equal to selectedIndex', function(assert) {
  assert.expect(2);

  var component = this.subject();

  this.render();

  Ember.run(() => {
    component.set('index', 0);
    component.set('selectedIndex', 1);
    assert.ok(!component.get('isActive'), 'index: 0; selectedIndex: 1; isActive: false;');

    component.set('index', 1);
    component.set('selectedIndex', 1);
    assert.ok(component.get('isActive'), 'index: 1; selectedIndex: 1; isActive: true;');

  });
});

test('if isActive is true then -active class is added', function(assert) {
  assert.expect(2);

  var component = this.subject();
  var $el;

  this.render();

  $el = component.$();

  Ember.run(() => {
    component.set('isActive', false);
    assert.ok($el.hasClass('-active'), false, 'swipe-item component does not have "-active" class');

    component.set('isActive', true);
    assert.ok($el.hasClass('-active'), true, 'swipe-item component has "-active" class');
  });
});
