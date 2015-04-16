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
  shiftTimes: ['2200', '0100', '0000', '0000'],
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
  shiftTimes: ['2100', '0100'],
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
}, {
  id: 22,
  type: 'on',
  shiftTimes: ['2200', '0100', '0000', '0000'],
  isMain: true
}, {
  id: 23,
  type: 'on',
  shiftTimes: ['2200', '0100'],
  isMain: true
}, {
  id: 24,
  type: 'Holiday',
  isMain: true
}, {
  id: 25,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 26,
  type: 'off',
  isMain: true
}, {
  id: 27,
  type: 'off',
  isMain: true
}, {
  id: 28,
  type: 'off',
  isMain: true
}, {
  id: 29,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 30,
  type: 'on',
  shiftTimes: ['0700', '0100'],
  isMain: true
}, {
  id: 31,
  type: 'off',
  isMain: true
}, {
  id: 32,
  type: 'on',
  shiftTimes: ['2200', '0100', '0000', '0000'],
  isMain: true
}, {
  id: 33,
  type: 'on',
  shiftTimes: ['2200', '0100'],
  isMain: true
}, {
  id: 34,
  type: 'Holiday',
  isMain: true
}, {
  id: 35,
  type: 'on',
  shiftTimes: ['0700', '1500', '2100', '0100'],
  isMain: true
}, {
  id: 36,
  type: 'off',
  isMain: true
}];

fixtures.forEach(f => {
  f.location = "Here";
  f.jobTitle = "Surf";
});

var shiftMoment = moment().startOf('isoWeek').subtract(14, 'days');
fixtures.forEach(f => {
  f.shiftDate = shiftMoment.format("YYYY-MM-DD 00:00:00.000");
  shiftMoment.add(1, 'day');
});

shiftMoment = moment().startOf('isoWeek');
fixtures.push({
  id: 37,
  type: 'on',
  isMain: false,
  shiftDate: shiftMoment.format("YYYY-MM-DD 00:00:00.000"),
  shiftTimes: ['0700', '1500'],
  location: "There",
  jobTitle: "Slave"
});

fixtures.forEach(f => {
  if (f.shiftTimes) {
    let newShifts = f.shiftTimes.map(function(startTime, index) {
      if ((index % 2) === 0) {
        var endTime = f.shiftTimes[index + 1];
        if (startTime !== endTime) {
          return {
            start: startTime,
            end: endTime,
            location: f.location,
            jobTitle: f.jobTitle
          };
        }
      }
    });
    f.shifts = newShifts.filter(shift => { return shift !== undefined; });
  }
});

RotaSchedule.reopenClass({
  FIXTURES: fixtures
});

export default RotaSchedule;
