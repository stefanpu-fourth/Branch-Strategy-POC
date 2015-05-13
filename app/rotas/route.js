import Ember from 'ember';
import SetSelectedIndex from 'ess/mixins/route-set-selected-index';
import config from 'ess/config/environment';

export
default Ember.Route.extend(SetSelectedIndex, {
  rotaService: Ember.inject.service(),

  collectionName: 'rotaWeeks',

  title: 'MY ROTAS',

  model: function() {
    var holidayBalance = this.store.all('holidayBalance');
    if (Ember.isEmpty(holidayBalance) || !config.cacheResources) {
      holidayBalance = this.store.find('holidayBalance');
    }

    var rotaService = this.get('rotaService');
    return Ember.RSVP.hash({
      holidayBalance: holidayBalance,
      rotaWeeks: rotaService.getRotaWeeks(new Date()),
      nextShift: rotaService.getNextShift()
    });
  },

  setupController: function(controller, model) {
    controller.setProperties({
      'attrs.holiday': model.holidayBalance.get('firstObject'),
      'attrs.rotaWeeks': model.rotaWeeks,
      'attrs.defaultIndex': 2,
      'attrs.selectedShift': model.nextShift,
      'attrs.selectedIndex': null,
      'attrs.isPanning': true
    });
  },

  actions: {
    setSelectedShift: function(shift) {
      this.set('attrs.selectedShift', shift);
    }
  }
});
