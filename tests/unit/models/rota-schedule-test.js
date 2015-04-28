import {
  moduleForModel,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForModel('rota-schedule', {
  // Specify the other units that are required for this test.
});

test('calculateShifts', function(assert) {
  var model = this.subject();

  Ember.run(() => {
    model.setProperties({
      location: "Some Restaurant",
      jobTitle: "Waiter",
      shiftDate: new Date(2015, 0, 1),
      shiftTimes: ['00:00', '05:00', '17:00', '23:00']
    });

    model.calculateShifts();
    var shifts = model.get('shifts');
    assert.equal(shifts.get('length'), 2, 'the correct number of shifts were returned');

    var shiftLocations = [shifts.get('firstObject.location'), shifts.get('lastObject.location')];
    assert.deepEqual(['Some Restaurant', 'Some Restaurant'], shiftLocations, 'the shifts contain the location');

    var shiftJobTitle = [shifts.get('firstObject.jobTitle'), shifts.get('lastObject.jobTitle')];
    assert.deepEqual(['Waiter', 'Waiter'], shiftJobTitle, 'the shifts contain the job title');
  });
});
