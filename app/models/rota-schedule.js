import DS from 'ember-data';

const { attr } = DS;

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

  // TODO - this logic is flawed and reliant upon particular words
  // this should probably be moved to a back-end provided field
  isNotRota: function() {
    const type = this.get('type');
    const onOff = /^(on|off|unavailable)$/i;

    return !(onOff.test(type));
  }.property('type'),

  shiftDateAsMoment: function() {
    return moment(this.get('shiftDate'));
  }.property('shiftDate'),

  isBetweenMoments: function(m1, m2) {
    return this.get('shiftDateAsMoment').isBetween(m1, m2);
  }
});
