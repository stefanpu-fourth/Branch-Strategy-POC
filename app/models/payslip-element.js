import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  amount: attr('number'),
  category: attr('string'),
  description: attr('string'),
  isGross: attr('boolean'),
  rate: attr('number'),
  units: attr('number')
});
