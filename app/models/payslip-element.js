import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  amount: attr('number'),
  category: attr('string'),
  description: attr('string'),
  isGross: attr('boolean'),
  rate: attr('number'),
  units: attr('number'),

  label: function () {
    var props = this.getProperties('description', 'rate', 'units');
    var displayUnits = props.rate && props.units;

    return displayUnits ? `${props.description} ${props.units}@${props.rate.toFixed(2)}` : props.description;
  }.property('description', 'rate', 'units')
});
