import Ember from 'ember';

export default Ember.Controller.extend({
  brandService: Ember.inject.service(),

  brandLogoUrl: Ember.computed.alias('brandService.imageUrl')
});
