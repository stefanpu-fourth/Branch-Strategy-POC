import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,

  notifyGoogleAnalytics: function() {
    var url = this.get('url');

    window.setTimeout(function() {
      ga('send', 'pageview', {
        'page': url,
        'title': document.title
      });
    }, 1);

    return true;
  }.on('didTransition')

});

Router.map(function() {
  this.route('rotas');
  this.route('payslips');
  this.route('rota');
  this.route('details');
});

export default Router;
