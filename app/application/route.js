import Ember from 'ember';
import config from 'ess/config/environment';
import icAjax from 'ic-ajax';

var employees = Ember.A(config.employees);

export default Ember.Route.extend({
  appStateService: Ember.inject.service(),
  brandService: Ember.inject.service(),

  model: function() {
    return this.store.findAll('root');
  },

  // TODO - split into a bower component for use by other apps
  loadBrand: function() {
    var head = document.querySelector('head');
    var link = document.createElement('link');
    Ember.$(link).prop('rel', 'stylesheet')
      .prop('href', this.get('brandService.cssUrl'));
    head.appendChild(link);

    return icAjax(this.get('brandService.jsonUrl')).then(brandData => {
      this.set('brandService.loadedBrandData', brandData);
    }, () => {
      console.warn('could not load the branding data');
    });
  },

  afterModel: function(root) {
    this.set('appStateService.rootResource', root.get('firstObject'));
    // this is here because fetching anything other than root depends on
    // on a properly setup appStateService (i.e. one with an employment on it)
    return this.store.findAll('mainemployment').then(e => {
      var first = e.get('firstObject');
      this.set('appStateService.employment', first);
      this.set('brandService.brandKey', first.get('companyName').toLowerCase());
      return this.loadBrand();
    });
  },

  refreshCurrentRoute: function () {
    var handlerInfos = this.get('router.router.currentHandlerInfos');
    var handler = handlerInfos[handlerInfos.length - 1];
    this.container.lookup(`route:${handler.name}`).refresh();
  },

  actions: {
    error(error/*, transition*/) {

      // TODO: handle the error 403 
      if (error && error.status === 403) {
        console.log('catch 403 error');
        // return this.transitionTo('errprPge', error);
      }
    },

    setCurrentEmployee: function (employeeId) {
      var employee = this.store.getById('root', employeeId) || this.store.createRecord('root', employees.findBy('id', employeeId));
      this.set('appStateService.rootResource', employee);
      this.refreshCurrentRoute();
    }
  }
});
