import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('swipe-container', {
  needs: [
    'component:swipe-tabs',
    'component:swipe-tab',
    'component:svg-icon',
    'template:partials/icons/chevron-left',
    'template:partials/icons/chevron-right'
  ]
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
  assert.expect(7);
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
  component.set('collection', []);
  component.set('selectedIndex', 0);
  assert.equal(component.get('isLast'), true, 'isLast is true with an empty collection and selectedIndex 0');
});

test('isTouch detects touch device', function(assert) {
  assert.expect(2);
  var component = this.subject();

  // NB this test used to check for a false result
  // but has been adjusted as PhantomJS appears to be touch-capable
  // From what I've read, this test may, possibly, fail in the IE11 JS engine
  assert.equal(component.get('isTouch'), ('ontouchstart' in window), 'isTouch false by default');

  // make sure isTouch isn't cached
  component.isTouch.volatile();

  // spoof it
  window.ontouchstart = true;
  assert.equal(component.get('isTouch'), true, 'isTouch true when ontouchstart present in window');
});

test('moreThanOne does proper checks', function(assert) {
  assert.expect(9);

  var component = this.subject();

  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection is not there');
  component.set('collection', []);
  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection is empty');
  component.set('collection', [1]);
  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection has single entry');
  component.set('collection', [1, 2]);
  assert.equal(component.get('moreThanOne'), true, 'moreThanOne is true when collection has two entries');
  component.set('collection', [1]);
  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection set back to a single entry');
  var collection = [1, 2, 3, 4];
  component.set('collection', collection);
  assert.equal(component.get('moreThanOne'), true, 'moreThanOne is true when collection has more than two entries');
  collection.splice(1, 3);
  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection length gets modified back to 1');
  collection.length = 0;
  assert.equal(component.get('moreThanOne'), false, 'moreThanOne is false when collection length gets modified back to zero');
  collection.push(1, 2);
  assert.equal(component.get('moreThanOne'), true, 'moreThanOne is true when collection gets two entries pushed');
});
