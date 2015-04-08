import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('swipe-tabs', {
  needs: [ 'component:swipe-tab' ]
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject({ collection: [ Ember.Object.create({ id: 1 }) ], selectedIndex: 0, tabPropertyKey: 'id' });
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
