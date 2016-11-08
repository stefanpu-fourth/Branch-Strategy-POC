import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import RenderNav from 'ess/mixins/render-nav';
import ErrorNotifications from 'ess/mixins/error-notifications';

export default Ember.Route.extend(FindWithCache, RenderNav, ErrorNotifications, {
  appStateService: Ember.inject.service(),

  title: 'HR DETAILS',

  model() {
    return Ember.RSVP.hash({
      employment: this.findAllWithCache('mainemployment'),
      employee: this.findWithCache('employee', this.get('appStateService.authenticatedEmployeeId')),
      nextOfKins: this.findAllWithCache('next-of-kin')
    });
  },

  setupController(controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
    controller.set('attrs.nextOfKins', model.nextOfKins);
  }
});
