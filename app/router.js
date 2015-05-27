import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,

  locationName: Ember.computed.alias('application.employment.locationName'),

  company: Ember.computed.alias('application.employment.companyName'),

  application: function () {
    return this.container.lookup('controller:application');
  }.property(),

  getCurrentTitle: function() {
    var title = this.get('application.currentRouteName');
    return this.container.lookup(`route:${title}`).get('title');
  }.property('application.currentRouteName'),

  notifyGoogleAnalytics: function() {
    var props = this.getProperties('url', 'getCurrentTitle', 'locationName', 'company');
    ga('send', 'pageview', {
      'page': props.url,
      'title': props.getCurrentTitle,
      'dimension1': props.company,
      'dimension2': props.locationName
    });

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
