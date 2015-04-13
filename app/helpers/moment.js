import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  options.hash.format = options.hash.format || 'YYYY-MM-DD';
  return new Ember.Handlebars.SafeString(moment(value).format(options.hash.format));
});
