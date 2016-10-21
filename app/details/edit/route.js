import Ember from 'ember';

export default Ember.Route.extend({

  /**
    Renders `details/edit/template.hbs` into main application outlet.

    @method renderTemplate
    @public
  */
  renderTemplate: function() {
    this.render('details.edit', { into: 'application' });
  }
});
