import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'holiday-info',

  displayReservedHoliday: Ember.computed.gte('info.reserved', 1)
});
