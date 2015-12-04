import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import RenderNav from 'ess/mixins/render-nav';

export default Ember.Route.extend(FindWithCache, RenderNav, {
  appStateService: Ember.inject.service(),

  title: 'HR DETAILS',

  model: function () {
    return Ember.RSVP.hash({
      employment: this.findAllWithCache('mainemployment'),
      employee: this.findWithCache('employee', this.get('appStateService.authenticatedEmployeeId'))
    });
  },

  setupController: function (controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
  }
});
