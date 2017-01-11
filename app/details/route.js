import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import RenderNav from 'ess/mixins/render-nav';
import ErrorNotifications from 'ess/mixins/error-notifications';

/**
  details route handler

  @class DetailsRoute
  @extends Ember.Route
  @uses FindWithCacheMixin
  @uses RenderNavMixin
  @uses ErrorNotificationsMixin
  @module Details
*/
export default Ember.Route.extend(FindWithCache, RenderNav, ErrorNotifications, {
  /**
    @property appStateService
    @type {Any}
    @public
  */
  appStateService: Ember.inject.service(),
  /**
    @property title
    @type {String}
    @default HR DETAILS
    @public
  */
  title: 'HR DETAILS',
  _employeeId: 0,
  /**
    Finds cached employments and employees.

    @method focusIn
    @public
    @return {Promise}
  */
  model: function() {
    return Ember.RSVP.hash({
      employment: this.findAllWithCache('mainemployment'),
      employee: this.findWithCache('employee', this.get('appStateService.authenticatedEmployeeId'))
    });
  },
  afterModel(model) {
    this.set('_employeeId', model.employee.id);
  },
  /**
    Sets employment and employee on the controller's
    attrs.

    @method setupController
    @param {DetailsController} controller
    @param {DetailsModel} model
  */
  setupController: function(controller, model) {
    controller.set('attrs.employment', model.employment);
    controller.set('attrs.employee', model.employee);
  },
  actions: {
    saveEmployee() {
      this.findWithCache('employee', this.get('_employeeId')).then(function(modelData) {
        // create copy for the employees
        // return to original copy
        //TODO: add validation before calling save
        //TODO: if wrong display the notifications and force? dirty attributes8
        // const modelDataIsValid = modelData.validate();
        // debugger;
        modelData.save().then(function(response) {
          // debugger;
          console.log(response);
        }, function(error) {
          // debugger;
          console.log(error);
        });

      });
    },
    cancelEdit() {
      // ask wether we should open a warning dialog?
      //if changes -> prompt/confirm
      this.findWithCache('employee', this.get('_employeeId')).then(function(result) {
        const modelHasChangedAttributes = result.get('hasDirtyAttributes');
        if (modelHasChangedAttributes) {
          // open confirm window
          result.rollbackAttributes();
        }
      });
      // else -> stop
    }
  }
});
