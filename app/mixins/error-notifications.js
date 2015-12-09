import Ember from 'ember';
import i18n from 'ess/i18n';

export default Ember.Mixin.create({

  _errorCodes: {
    '403': 'forbidden',
    '404': 'notFound'
  },

  _getErrorTranslationKey(error) {
    const { _errorCodes } = this;
    let key = 'catchAll';

    if (error && error.status && _errorCodes.hasOwnProperty(error.status)) {
      key = _errorCodes[error.status];
    }

    return key;
  },

  actions: {
    error(error, transition) {
      const translationKey = this._getErrorTranslationKey(error);
      const message = i18n.t(`errorNotifications.${translationKey}`);

      this.notifications.addNotification({
        message,
        type: 'error',
        autoClear: true,
        clearDuration: 3000
      });

      return transition.abort();
    }
  }
});
