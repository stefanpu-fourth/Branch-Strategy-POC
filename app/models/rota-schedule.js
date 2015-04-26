import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  type: attr('string'),
  shiftDate: attr('date'),
  location: attr('string'),
  department: attr('string'),
  jobTitle: attr('string'),
  isMain: attr('boolean'),
  shiftTimes: attr(),
  rotaStart: attr('date'),
  rotaStartDayOfWeek: attr('number'),

  shifts: null // populated after load by the rota service
  // TODO - probably means some functionality needs to move here.
});
