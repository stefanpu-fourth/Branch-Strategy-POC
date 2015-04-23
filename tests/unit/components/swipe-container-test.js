import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('swipe-container', {
  needs: ['component:swipe-tabs', 'component:swipe-tab']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject({ collection: [Ember.Object.create({ id: 1 })], tabPropertyKey: 'id', selectedIndex: 0 });
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('transitionEvents returns a string of namespace vendor prefixed events', function (assert) {
  assert.expect(1);

  var component = this.subject();
  var namespace = Ember.guidFor(component);
  var expected = `transitionend.${namespace} webkitTransitionEnd.${namespace} oTransitionEnd.${namespace} MSTransitionEnd.${namespace}`;

  assert.equal(component.get('transitionEvents'), expected, 'transitionEvents returns the expected string');
});

test('isFirst works', function(assert) {
  assert.expect(3);
  var component = this.subject();

  // by default, selectedIndex is null

  assert.equal(component.get('isFirst'), false, 'isFirst is false without selectedIndex defined');
  component.set('selectedIndex', 0);
  assert.equal(component.get('isFirst'), true, 'isFirst is true when selectedIndex is 0');
  component.set('selectedIndex', 1);
  assert.equal(component.get('isFirst'), false, 'isFirst is false when selectedIndex is 1');
});

test('isLast works', function(assert) {
  assert.expect(6);
  var component = this.subject();

  // by default, selectedIndex is null, and collection is null

  assert.equal(component.get('isLast'), false, 'isLast is false without a collection');
  component.set('collection', [1]);
  assert.equal(component.get('isLast'), false, 'isLast is false with a collection but no selectedIndex');
  component.set('selectedIndex', 0);
  assert.equal(component.get('isLast'), true, 'isLast is true with a collection and selectedIndex 0');
  component.set('collection', [1, 2, 3]);
  assert.equal(component.get('isLast'), false, 'isLast is false with a 3 item collection and selectedIndex 0');
  component.set('selectedIndex', 1);
  assert.equal(component.get('isLast'), false, 'isLast is false with a 3 item collection and selectedIndex 1');
  component.set('selectedIndex', 2);
  assert.equal(component.get('isLast'), true, 'isLast is true with a 3 item collection and selectedIndex 2');
});

test('isTouch detects touch device', function(assert) {
  assert.expect(2);
  var component = this.subject();

  assert.equal(component.get('isTouch'), false, 'isTouch false by default');

  // make sure isTouch isn't cached
  component.isTouch.volatile();

  // spoof it
  window.ontouchstart = true;
  assert.equal(component.get('isTouch'), true, 'isTouch true when ontouchstart present in window');
});

test('moreThanOne does proper checks', function(assert) {
  assert.expect(5);

  var component = this.subject();

  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection is not there');
  component.set('collection', []);
  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection is empty');
  component.set('collection', [1]);
  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection has single entry');
  component.set('collection', [1, 2]);
  assert.equal(component.get('moreThanOne'), true, 'moreThanOne is true when collection has two entries');
  component.set('collection', [1, 2, 3, 4]);
  assert.equal(component.get('moreThanOne'), true, 'moreThanOne is true when collection has more than two entries');
});
