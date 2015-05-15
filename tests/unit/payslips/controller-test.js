import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:payslips', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('setSelectedIndex action set the selectedIndex property on the controllers attrs hash', function(assert) {
  var controller = this.subject();

  Ember.run(() => {
    controller.set('attrs.defaultIndex', 2);

    //called with no arguments should default to length of model collection minus 1
    controller.send('setSelectedIndex');

    assert.equal(controller.get('attrs.selectedIndex'), 2, 'attrs.selectedIndex is equal to 2 after "setSelectedIndex" action');

    controller.send('setSelectedIndex', 11);
    assert.equal(controller.get('attrs.selectedIndex'), 11, 'attrs.selectedIndex is equal to 11 after "setSelectedIndex(11)" action');
  });
});
