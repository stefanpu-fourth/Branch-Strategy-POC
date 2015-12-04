import Ember from 'ember';

export default Ember.Mixin.create({
  renderTemplate() {
    this.render();

    this.render('application/nav', {
      into: 'application',
      outlet: 'nav',
      controller: 'application'
    });
  }
});
