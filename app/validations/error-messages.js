import Ember from 'ember';
import i18n from 'ess/i18n';

/**
  @class ErrorMessages
  @extends Ember.Object
  @public
*/
export default Ember.Object.create({
  presence: i18n.t('errorValidation.presence'),
  alphabetical: i18n.t('errorValidation.alphabetical'),
  length: i18n.t('errorValidation.length'),
  leadingZero: i18n.t('errorValidation.leadingZero'),
  onlyDigits: i18n.t('errorValidation.onlyDigits')
});
