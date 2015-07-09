/* globals ga */
import config from 'ess/config/environment';
import icAjax from 'ic-ajax';

export function initialize(container, application) {
  application.deferReadiness();

  return icAjax(`${config.baseURL}${config.userEndPoint}`, { dataType: 'json' }).then(userData => {
    //init analytics
    ga('create', config.gaTracker, 'auto', {
      userId: userData.ExternalId
    });
  }, error => {
    console.warn('Couldn\'t set up google analytics, error thrown while getting user info - %o', error);
  }).then(() => {
    application.advanceReadiness();
  });
}

export default {
  name: 'init-user',
  initialize: initialize
};
