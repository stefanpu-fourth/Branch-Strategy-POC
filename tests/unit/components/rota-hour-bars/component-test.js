import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('rota-hour-bars', {
  // Specify the other units that are required for this test
  needs: ['component:rota-hour-bar'],
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

test('it creates bars arrays', function(assert) {
  assert.expect(8);

  var component = this.subject();

  Ember.run(() => {
    // bars are calculated with FP - checks floor them
    function makeBarsWithInterval(count, interval, offset=0) {
      var checkBars = [];
      for (let i = 1; i < count + 1; i++) {
        checkBars.push(Math.floor(offset + (i * interval)));
      }
      return checkBars;
    }

    var floorBars = (bar) => Math.floor(bar);

    var bars = component.get('bars').map(floorBars);

    // by default dayStart/end are midnight, with a period of
    assert.equal(bars.length, 7, 'By default we should have 7 bar positions');
    assert.deepEqual(bars, makeBarsWithInterval(7, 100 / 8), 'Those bar positions should be as 12.5% intervals');

    // shift start to 6am, and we should lose two bars
    component.set('dayStart', 6*60);
    bars = component.get('bars').map(floorBars);
    assert.equal(bars.length, 5, 'a 6am to midnight day should have 5 bars');
    assert.deepEqual(bars, makeBarsWithInterval(5, 100 / 6), 'which should be at 16.666% intervals');

    // shift our start back to 4am and we should get an extra bar
    component.set('dayStart', 4*60);
    bars = component.get('bars').map(floorBars);
    assert.equal(bars.length, 6, '4am to midnight day will have 6 bars');
    assert.deepEqual(bars, makeBarsWithInterval(6, (100 / 20) * 3, -(100 / 20)), 'which should be at 15% intervals');

    // set day end back to 2am
    component.set('dayEnd', 2*60);
    bars = component.get('bars').map(floorBars);
    assert.equal(bars.length, 7, '4am to 2am day will have 7 bars');
    assert.deepEqual(bars, makeBarsWithInterval(7, (100 / 22) * 3, -(100 / 22)), 'which should be at, er, smaller intervals');
  });
});
