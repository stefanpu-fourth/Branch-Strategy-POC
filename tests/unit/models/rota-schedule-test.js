import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('rota-schedule', {
  // Specify the other units that are required for this test.
});

test('it can detect non-rota days', function(assert) {
  assert.expect(7);

  // Creates the component instance
  var model = this.subject();

  Ember.run(() => {
    model.set('type', 'on');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'off');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'On');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'OFF');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'Xon');
    assert.equal(model.get('isNotRota'), true);
    model.set('type', 'Xoff');
    assert.equal(model.get('isNotRota'), true);
    model.set('type', 'Holiday');
    assert.equal(model.get('isNotRota'), true);
  });
});
