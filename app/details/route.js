import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import RenderNav from 'ess/mixins/render-nav';
import ErrorNotifications from 'ess/mixins/error-notifications';

export default Ember.Route.extend(FindWithCache, RenderNav, ErrorNotifications, {
  appStateService: Ember.inject.service(),
  title: 'HR DETAILS',
  _localEmployeeCopy: {},
  model: function () {
    return Ember.RSVP.hash({
      employment: this.findAllWithCache('mainemployment'),
      employee: this.findWithCache('employee', this.get('appStateService.authenticatedEmployeeId'))
    });
  },
  // afterModel(model) {
  //   // Here we attempt to copy the model for local reference
  //   debugger;
  //   this.set('_localEmployeeCopy', Ember.copy(model, true));
  //   let a = this.get('_localEmployeeCopy');
  // },

  setupController: function (controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
  },
  actions: {
    saveEmployee() {
      debugger;
      let adapter = this.store.adapterFor('employee');
      // let self = this;
      this.model().then(function(modelData) {
        // create copy for the employees
        // return to original copy
        debugger;
        // self.store.update('employee', modelData.employee)
        adapter.update(modelData.employee);
      })
      // let a = this.get('employee');
      // a.update('employee', a);
    }
  }
});
