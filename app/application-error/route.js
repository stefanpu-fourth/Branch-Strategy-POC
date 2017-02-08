import Ember from 'ember';

export default Ember.Route.extend({

  _errorCodes: {
    '403': 'application-error/forbidden'
  },

  renderTemplate() {
    const { currentModel, _errorCodes } = this;
    const { status } = currentModel;
    const template = _errorCodes[status] || 'application-error';

    const noPurpouse = "som baba";
    console.log(noPurpouse);

    this.render(template);
  }

});
