import DS from 'ember-data';

var attr = DS.attr;

var RotaSchedule = DS.Model.extend({
  type: attr('string'),
  shiftDate: attr('date'),
  location: attr('string'),
  department: attr('string'),
  jobTitle: attr('string'),
  isMain: attr('boolean'),
  shiftTimes: attr(),
  shifts: attr(),
  rotaStart: attr('date'),
  rotaStartDayOfWeek: attr('number')
});

var fixtures = [{
  id: 1,
  type: 'on',
  shiftTimes: ['0700', '1500'],
  isMain: true
}, {
  id: 2,
  type: 'off',
  isMain: true
}, {
  id: 3,
  type: 'off',
  isMain: true
}, {
  id: 4,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 5,
  type: 'on',
  shiftTimes: ['0700', '2100'],
  isMain: true

}, {
  id: 6,
  type: 'Holiday',
  isMain: true

}, {
  id: 7,
  type: 'on',
  shiftTimes: ['1500', '2100'],
  isMain: true
}, {
  id: 8,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 9,
  type: 'off',
  isMain: true
}, {
  id: 10,
  type: 'Absent',
  isMain: true
}, {
  id: 11,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 12,
  type: 'on',
  shiftTimes: ['2200', '0100'],
  isMain: true
}, {
  id: 13,
  type: 'on',
  shiftTimes: ['2200', '0100'],
  isMain: true
}, {
  id: 14,
  type: 'Holiday',
  isMain: true
}, {
  id: 15,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 16,
  type: 'off',
  isMain: true
}, {
  id: 17,
  type: 'off',
  isMain: true
}, {
  id: 18,
  type: 'off',
  isMain: true
}, {
  id: 19,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 20,
  type: 'on',
  shiftTimes: ['0700', '0100'],
  isMain: true
}, {
  id: 21,
  type: 'off',
  isMain: true
}];

var shiftMoment = moment().startOf('isoWeek').subtract(7, 'days');
fixtures.forEach(f => {
  f.shiftDate = shiftMoment.format("YYYY-MM-DD 00:00:00.000");
  shiftMoment.add(1, 'day');
});

fixtures.forEach(f => {
  if (f.shiftTimes) {
    let newShifts = f.shiftTimes.map(function(time, index) {
      if ((index % 2) === 0) {
        return {
          start: time,
          end: f.shiftTimes[index + 1]
        };
      }
    });
    f.shifts = newShifts.filter(shift => { return shift !== undefined; });
  }
});

RotaSchedule.reopenClass({
  FIXTURES: fixtures
});

export default RotaSchedule;
