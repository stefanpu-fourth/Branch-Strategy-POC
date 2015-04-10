import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'rota__holiday',

  displayReservedHoliday: Ember.computed.gte('info.Reserved', 1)
});
