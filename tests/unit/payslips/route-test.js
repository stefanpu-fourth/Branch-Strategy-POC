import {
  moduleFor,
  test
}
from 'ember-qunit';
import Ember from 'ember';

var mockController = Ember.Object.extend({
  attrs: {
    payslips: Ember.ArrayProxy.create({ content: Ember.A([1, 2, 3]) })
  }
});

moduleFor('route:payslips', {
  needs: []
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});

test('setSelectedIndex action set the selectedIndex property on the controllers attrs hash', function(assert) {
  var route = this.subject();
  var controller;

  Ember.run(() => {
    controller = mockController.create({});

    route.set('controller', controller);

    //called with no arguments should default to length of model collection minus 1
    route.send('setSelectedIndex');
    assert.equal(controller.get('attrs.selectedIndex'), 2, 'controller.attrs.selectedIndex is equal to 2 after "setSelectedIndex" action');

    route.send('setSelectedIndex', 11);
    assert.equal(controller.get('attrs.selectedIndex'), 11, 'controller.attrs.selectedIndex is equal to 11 after "setSelectedIndex(11)" action');
  });
});
