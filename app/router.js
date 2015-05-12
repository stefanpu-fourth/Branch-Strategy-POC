import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,

  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': document.title
    });
  }.on('didTransition')

});

Router.map(function() {
  this.route('rotas');
  this.route('payslips');
  this.route('rota');
  this.route('details');
});

export default Router;
