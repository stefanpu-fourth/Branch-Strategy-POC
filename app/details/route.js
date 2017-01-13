import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';
import RenderNav from 'ess/mixins/render-nav';
import ErrorNotifications from 'ess/mixins/error-notifications';
import i18n from 'ess/i18n';

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
      this.findWithCache('employee', this.get('_employeeId')).then((modelData) => {
        const isModelDataValid = modelData.get('validations.isValid');
        const modelHasChangedAttributes = modelData.get('hasDirtyAttributes');

        if (modelHasChangedAttributes && isModelDataValid) {
          modelData.save().then(() => {
            this.get('notifications').addNotification({
              message: i18n.t('successNotifications.employeeUpdate'),
              type: 'success',
              autoClear: true,
              clearDuration: 5000
            });
            this.set('controller.isModalOpen', false);
            modelData.reload();
          }, (error) => {
            this.get('notifications').addNotification({
              message: i18n.t('errorNotifications.employeeUpdate'),
              type: 'error',
              autoClear: true,
              clearDuration: 5000
            });
            console.error(error);
            modelData.rollbackAttributes();
            this.set('controller.isModalOpen', false);
          });
        } else {
          //const modelDataErrorArray = modelData.get('validations.errors');
          //TODO: display error notification saying some of the data is invalid
          console.log('Invalid validation');
        }
      });
    },

    cancelEdit() {
      this.findWithCache('employee', this.get('_employeeId')).then((result) => {
        const modelHasChangedAttributes = result.get('hasDirtyAttributes');
        if (modelHasChangedAttributes) {
          result.rollbackAttributes();
        }
      });
    }
  }
});
