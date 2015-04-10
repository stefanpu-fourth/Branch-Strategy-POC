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
  rotaStart: attr('date'),
  rotaStartDayOfWeek: attr('number')
});

RotaSchedule.reopenClass({
  FIXTURES: [{
    id: 1,
    type: 'on',
    shiftDate: '2015-04-06 00:00:00.000',
    shiftTimes: ['0700', '1500'],
    isMain: true
  }, {
    id: 2,
    type: 'off',
    shiftDate: '2015-04-07 00:00:00.000',
    isMain: true
  }, {
    id: 3,
    type: 'off',
    shiftDate: '2015-04-08 00:00:00.000',
    isMain: true
  }, {
    id: 4,
    type: 'on',
    shiftDate: '2015-04-09 00:00:00.000',
    shiftTimes: ['0700', '1500', '2100', '0100'],
    isMain: true
  }, {
    id: 5,
    type: 'on',
    shiftDate: '2015-04-10 00:00:00.000',
    shiftTimes: ['0700', '2100'],
    isMain: true

  }, {
    id: 6,
    type: 'off',
    shiftDate: '2015-04-11 00:00:00.000',
    isMain: true

  }, {
    id: 7,
    type: 'on',
    shiftDate: '2015-04-12 00:00:00.000',
    shiftTimes: ['0700', '1500', '2100', '0100'],
    isMain: true
  }]
});

export default RotaSchedule;
