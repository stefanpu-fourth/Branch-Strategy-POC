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

  /**
    Finds cached employments and employees.

    @method model
    @return {DS.Promise} `LocationModel` record
    @public
  */
  model: function () {
    const test = "test";
    console.log(test);
    return Ember.RSVP.hash({
      employment: this.findAllWithCache('mainemployment2'),
      employee: this.findWithCache('employee', this.get('appStateService.authenticatedEmployeeId')),
      user: "some2"
      emptyOne: {
        id: 0,
        name: 'empty one'
      }
    });
  },

  /**
    Sets employment and employee on the controller's
    attrs.

    @method setupController
    @param {DetailsController} controller
    @param {DetailsModel} model
  */
  setupController: function (controller, model) {
    controller.set('attrs.employment', model.employment);
    const test = "test";
    console.log(test);
    controller.set('attrs.employee', model.employee);
  },

  _privateLegitMethod: function(test) {
    console.log(test);
    return test;
  }
});
