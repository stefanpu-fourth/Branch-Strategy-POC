import Ember from 'ember';
import FindWithCache from 'ess/mixins/route-find-with-cache';

export default Ember.Route.extend(FindWithCache, {
  appStateService: Ember.inject.service(),

  model() {
    return this.findWithCache('employee', this.get('appStateService.authenticatedEmployeeId'));
  },

  /**
    Renders `details/edit/template.hbs` into main application outlet.
    Renders 'details/edit/header/template.hbs' in application 'nav' outlet.

    @method renderTemplate
    @public
  */
  renderTemplate() {
    this.render('details.edit', {
      into: 'details'
    });

    this.render('details.edit.header', {
      into: 'application',
      outlet: 'nav'
    });
  }
});
