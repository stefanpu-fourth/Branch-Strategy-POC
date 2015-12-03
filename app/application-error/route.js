import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate() {
    const { currentModel } = this;
    const { status } = currentModel;
    let template = 'application-error';

    if (status === '403') {
      template = 'application-error/forbidden';
    }

    this.render(template);
  }

});
