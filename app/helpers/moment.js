import Ember from 'ember';
import i18n from 'ess/i18n';

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  var fm = options.hash.format;
  var format = fm ? i18n.t(`dateFormats.${fm}`) : i18n.t('dateFormats.default');
  return new Ember.Handlebars.SafeString(moment(value).format(format));
});
