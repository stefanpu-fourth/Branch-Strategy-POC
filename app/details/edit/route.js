import Ember from 'ember';

export default Ember.Route.extend({

  /**
    Renders `details/edit/template.hbs` into main application outlet.
    Renders 'details/edit/header/template.hbs' in application 'nav' outlet.

    @method renderTemplate
    @public
  */
  renderTemplate() {
    this.render('details.edit', {
      into: 'application'
    });

    this.render('details.edit.header', {
      into: 'application',
      outlet: 'nav'
    });
  }
});
