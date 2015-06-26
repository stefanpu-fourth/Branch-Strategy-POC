import Ember from 'ember';
import config from 'ess/config/environment';

export default Ember.Service.extend({
  brandKey: null,

  baseUrl: function() {
    return `${config.brandingService}/${this.get('brandKey')}`;
  }.property(),

  imageUrl: function() {
    return `${this.get('baseUrl')}/image-thumbnail.png`;
  }.property('brandKey'),

  jsonUrl: function() {
    return `${this.get('baseUrl')}/brand.json`;
  }.property('brandKey'),

  cssUrl: function() {
    return `${this.get('baseUrl')}/style.css`;
  }.property('brandKey'),

  loadedBrandData: {}
});
